import {
  Body,
  Controller,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Type,
} from '@nestjs/common';
import { IDefaultService } from './default.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteApi,
  GetApi,
  GetOneApi,
  PaginatedApi,
  PatchApi,
} from './__old/decorators';
import { Auth } from './__old/decorators';

export interface IDefaultController<Entity, CreateDto, UpdateDto> {
  service: IDefaultService<Entity, CreateDto, UpdateDto>;
  create(dto: CreateDto): Promise<Entity>;
  findAll(page?: number, limit?: number): Promise<Pagination<Entity>>;
  findOne(id: number): Promise<Entity>;
  update(id: number, dto: UpdateDto): Promise<Entity | NotFoundException>;
  remove(id: number);
}

/***
 * Controller **CRUD** Padrão:
 * Este mixin devolve uma classe com os comportamentos básicos de **CRUD**:
 * - Create
 * - Read
 * - Update
 * - Delete
 *
 * **Importante!**: Para as validações funcionarem, é necessário
 * sobrescrever os métodos **Create** e **Update**
 * @param path {string} Caminho do controller
 * @param Entity {?} Entidade do TypeOrm
 * @param service {DefaultService} Serviço utilizado
 * @param CreateDto {?} DTO de criação da entidade
 * @param UpdateDto {?} DTO de atualização de entidade
 */
export function DefaultController(
  path: string,
  Entity,
  service,
  CreateDto,
  UpdateDto,
): Type<IDefaultController<typeof Entity, typeof CreateDto, typeof UpdateDto>> {
  @ApiTags(path)
  @Controller(path)
  class DefaultControllerHost {
    @Inject(service) service: IDefaultService<
      typeof Entity,
      typeof CreateDto,
      typeof UpdateDto
    >;

    /***
     * Endpoint de POST para criação
     * @param dto {?} Dto de criação de entidade
     * @returns {Promise<?>} Entidade TypeORM criada
     */
    @Post()
    create(@Body() dto: typeof CreateDto): Promise<typeof Entity> {
      return this.service.create(dto);
    }

    /***
     * Endpoint de GET (FindAll)
     * @returns {Promise<?[]>} Entidades TypeORM
     */
    // TODO: fix(#3): swagger Verificar como retornar o tipo no swagger
    @GetApi()
    @PaginatedApi()
    findAll(
      @Query('page') page?: number,
      @Query('limit')
      limit?: number,
    ): Promise<Pagination<typeof Entity>> {
      // Caso o controller receba 0 ou valores negativos, mandar o valor padrão
      limit = limit || +process.env.DEFAULT_PAGE_SIZE;
      page = page || 1;
      const max = +process.env.MAX_PAGE_SIZE;
      if (limit > max) {
        limit = max;
      }

      return this.service.findAll({ page, limit });
    }

    /***
     * Endpoint de GET (FindOne)
     * @param id {string} id, via param
     * @returns {Promise<?>} Entidade TypeORM
     */
    @GetOneApi(Entity)
    findOne(@Param('id', ParseIntPipe) id: number): Promise<typeof Entity> {
      return this.service.findOne(+id);
    }

    /***
     * Endpoint de PATCH (Update)
     * @param id {string} id, via param
     * @param dto {?} Dto de atualização de entidade
     * @returns {Promise<?>} Entidade TypeORM
     */
    @PatchApi()
    @Auth()
    update(
      @Param('id') id: number,
      @Body() dto: typeof UpdateDto,
    ): Promise<typeof Entity> {
      return this.service.update(+id, dto);
    }

    /***
     * Endpoint de DELETE
     * @param id {string} id, via param
     * @returns {Promise<?>} Entidade TypeORM
     */
    @DeleteApi()
    @Auth()
    remove(@Param('id') id: number): Promise<typeof Entity> {
      return this.service.remove(+id);
    }
  }
  return DefaultControllerHost;
}
