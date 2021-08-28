import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Type,
} from '@nestjs/common';
import { IDefaultService } from './default.service';
import { Pagination } from 'nestjs-typeorm-paginate';

export interface IDefaultController<Entity, CreateDto, UpdateDto> {
  service: IDefaultService<Entity, CreateDto, UpdateDto>;
  create(dto: CreateDto): Promise<Entity>;
  findAll(page?: number, limit?: number): Promise<Pagination<Entity>>;
  findOne(id: number): Promise<Entity>;
  // TODO: Trocar de string para number
  update(id: string, dto: UpdateDto): Promise<Entity>;
  remove(id: string);
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
    @Get()
    findAll(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
      @Query(
        'limit',
        new DefaultValuePipe(process.env.DEFAULT_PAGE_SIZE || 10),
        ParseIntPipe,
      )
      limit = 10,
    ): Promise<Pagination<typeof Entity>> {
      return this.service.findAll({
        page,
        // Caso o controller receba 0, mandar o valor padrão
        limit: limit || +process.env.DEFAULT_PAGE_SIZE || 10,
      });
    }

    /***
     * Endpoint de GET (FindOne)
     * @param id {string} id, via param
     * @returns {Promise<?>} Entidade TypeORM
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<typeof Entity> {
      return this.service.findOne(+id);
    }

    /***
     * Endpoint de PATCH (Update)
     * @param id {string} id, via param
     * @param dto {?} Dto de atualização de entidade
     * @returns {Promise<?>} Entidade TypeORM
     */
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() dto: typeof UpdateDto,
    ): Promise<typeof Entity> {
      return this.service.update(+id, dto);
    }

    /***
     * Endpoint de DELETE
     * @param id {string} id, via param
     * @returns {Promise<?>} Entidade TypeORM
     */
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string): Promise<typeof Entity> {
      return this.service.remove(+id);
    }
  }
  return DefaultControllerHost;
}
