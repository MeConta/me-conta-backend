import {
  Injectable,
  NotFoundException,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Erros } from './erros.enum';

export interface IDefaultService<Entity, CreateDto, UpdateDto> {
  repository: Repository<Entity>;
  create(dto: CreateDto): Promise<Entity>;
  findAll(conditions?: FindConditions<Entity>): Promise<Entity[]>;
  findOne(id: number): Promise<Entity>;
  update(id: number, dto: UpdateDto): Promise<Entity>;
  remove(id: number): Promise<Entity>;
}

/***
 * Service **CRUD** padrão
 * Este mixin devolve uma classe com os comportamentos básicos de **CRUD**:
 * - Create
 * - Read (findAll, findOne)
 * - Update
 * - Delete
 * @param Entity {?} Entidade TypeOrm relacionada a este serviço
 */
export function DefaultService<CreateDto, UpdateDto>(
  Entity,
): Type<IDefaultService<typeof Entity, CreateDto, UpdateDto>> {
  @Injectable()
  class DefaultServiceHost
    implements IDefaultService<typeof Entity, CreateDto, UpdateDto>
  {
    @InjectRepository(Entity)
    repository: Repository<typeof Entity>;

    /***
     * Criação de entidade
     * @param dto {?} DTO da entidade a ser criada
     * @throws {UnprocessableEntityException} é possível que o banco retorne 422,
     * podendo ser necessário sobrescrever essa implementação caso precise de um tratamento mais fino
     * @returns {Promise<?>} A entidade salva no banco
     */
    async create(dto: CreateDto): Promise<typeof Entity> {
      try {
        return await this.repository.save(this.repository.create(dto));
      } catch (e) {
        throw new UnprocessableEntityException(Erros.EMAIL_DUPLICADO);
      }
    }

    /***
     * Retornar todas as entidades
     * @param conditions {FindConditions<?>} é possível utilizar campos da entidade para fazer um where
     * @returns {Promise<?[]>} Uma promise de entidades TypeORM
     */
    async findAll(
      conditions: FindConditions<typeof Entity> = null,
    ): Promise<typeof Entity[]> {
      return this.repository.find(
        conditions
          ? {
              where: conditions,
            }
          : null,
      );
    }

    /***
     * Retornar uma entidade via ID
     * @param id {number} Id da entidade a ser retornada
     * @returns {Promise<?>} Uma promise de entidade TypeORM
     * @throws {NotFoundException} É possível o retorno de um 404
     */
    async findOne(id: number): Promise<typeof Entity> {
      const usuario = await this.repository.findOne(id);
      if (!usuario) {
        throw new NotFoundException(Erros.NAO_ENCONTRADO);
      }
      return usuario;
    }

    /***
     * Atualizar entidade
     * @param id {number} Id da entidade a ser atualizada
     * @param dto {?} DTO de atualização da entidade
     * @throws {NotFoundException} É possível o retorno de um 404
     * @throws {UnprocessableEntityException} é possível que o banco retorne 422,
     * podendo ser necessário sobrescrever essa implementação caso precise de um tratamento mais fino
     */
    async update(id: number, dto: UpdateDto) {
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
  }
  return DefaultServiceHost;
}
