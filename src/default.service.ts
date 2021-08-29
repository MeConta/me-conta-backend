import {
  Injectable,
  NotFoundException,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Erros } from './config/constants';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

export interface IDefaultService<Entity, CreateDto, UpdateDto> {
  readonly repository: Repository<Entity>;
  create(dto: CreateDto): Promise<Entity>;
  findAll(
    pagination?: IPaginationOptions,
    conditions?: FindConditions<Entity>,
  ): Promise<Pagination<Entity>>;
  findOne(id: number): Promise<Entity>;
  update(id: number, dto: UpdateDto): Promise<Entity>;
  remove(id: number): Promise<Entity>;
  paginate(
    pagination: IPaginationOptions,
    conditions: FindConditions<Entity>,
  ): Promise<Pagination<Entity>>;
}

/***
 * Service **CRUD** padrão
 * Este mixin devolve uma classe com os comportamentos básicos de **CRUD**:
 * - Create
 * - Read (findAll, findOne)
 * - Update
 * - Delete
 * @param Entity {?} Entidade TypeOrm relacionada a este serviço
 * @param CreateDto {?} Objeto de DTO para create
 * @param UpdateDto {?} Objeto de DTO para update
 */
export function DefaultService(
  Entity,
  CreateDto,
  UpdateDto,
): Type<IDefaultService<typeof Entity, typeof CreateDto, typeof UpdateDto>> {
  @Injectable()
  class DefaultServiceHost
    implements
      IDefaultService<typeof Entity, typeof CreateDto, typeof UpdateDto>
  {
    @InjectRepository(Entity)
    readonly repository: Repository<typeof Entity>;

    /***
     * Criação de entidade
     * @param dto {?} DTO da entidade a ser criada
     * @throws {UnprocessableEntityException} é possível que o banco retorne 422,
     * podendo ser necessário sobrescrever essa implementação caso precise de um tratamento mais fino
     * @returns {Promise<?>} A entidade salva no banco
     */
    async create(dto: typeof CreateDto): Promise<typeof Entity> {
      try {
        return await this.repository.save(this.repository.create(dto));
      } catch (e) {
        throw new UnprocessableEntityException(e);
      }
    }

    /***
     * Retornar todas as entidades
     * @param conditions {FindConditions<?>} é possível utilizar campos da entidade para fazer um where
     * @param pagination {IPaginationOptions} Opções de paginação
     * @returns {Promise<Pagination<?>>} Uma promise de pagination das entidades TypeORM
     */
    async findAll(
      pagination: IPaginationOptions = {
        limit: process.env.DEFAULT_PAGE_SIZE || 10,
        page: 1,
      },
      conditions: FindConditions<typeof Entity> = null,
    ): Promise<Pagination<typeof Entity>> {
      return this.paginate(pagination, conditions);
    }

    /***
     * Retornar uma entidade via ID
     * @param id {number} Id da entidade a ser retornada
     * @returns {Promise<?>} Uma promise de entidade TypeORM
     * @throws {NotFoundException} É possível o retorno de um 404
     */
    async findOne(id: number): Promise<typeof Entity> {
      const entity = await this.repository.findOne({
        where: {
          id,
        },
      });
      if (!entity) {
        throw new NotFoundException(Erros.NAO_ENCONTRADO);
      }
      return entity;
    }

    /***
     * Atualizar entidade
     * @param id {number} Id da entidade a ser atualizada
     * @param dto {?} DTO de atualização da entidade
     * @throws {NotFoundException} É possível o retorno de um 404
     * @throws {UnprocessableEntityException} é possível que o banco retorne 422,
     * podendo ser necessário sobrescrever essa implementação caso precise de um tratamento mais fino
     */
    async update(id: number, dto: typeof UpdateDto) {
      await this.findOne(id);
      try {
        await this.repository.save<typeof Entity>({
          ...dto,
          id,
        });
        return this.findOne(id);
      } catch (e) {
        throw new UnprocessableEntityException(Erros.PARAMETROS_INCORRETOS);
      }
    }

    /***
     * Remoção (soft delete) de uma entidade
     * @param id {number}
     * @returns {Promise<?>} Uma promise de entidade TypeORM
     * @throws {NotFoundException} É possível o retorno de um 404
     */
    async remove(id: number): Promise<typeof Entity> {
      return this.repository.softRemove([await this.findOne(id)]);
    }

    // TODO: remover este método, chamando o paginate direto no findAll
    /***
     * Método de paginação
     * @param pagination {IPaginationOptions} opções de paginação
     * @param conditions {FindConditions<?>} opções de busca
     */
    paginate(
      pagination: IPaginationOptions,
      conditions: FindConditions<typeof Entity>,
    ): Promise<Pagination<typeof Entity>> {
      return paginate<typeof Entity>(
        this.repository,
        pagination,
        conditions || null,
      );
    }
  }
  return DefaultServiceHost;
}
