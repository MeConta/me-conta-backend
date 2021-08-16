import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Type,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IDefaultService } from './default.service';

export interface IDefaultController<Entity, CreateDto, UpdateDto> {
  service: IDefaultService<Entity, CreateDto, UpdateDto>;
  create(dto: CreateDto): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findOne(id: string): Promise<Entity>;
  update(id: string, dto: UpdateDto): Promise<Entity>;
  remove(id: string);
}

export function DefaultController(
  path: string,
  Entity,
  CreateDto,
  UpdateDto,
  service,
): Type<IDefaultController<typeof Entity, typeof CreateDto, typeof UpdateDto>> {
  @Controller(path)
  class DefaultControllerHost {
    @Inject(service) service: IDefaultService<
      typeof Entity,
      typeof CreateDto,
      typeof UpdateDto
    >;

    @Post()
    create(@Body() dto: typeof CreateDto): Promise<typeof Entity> {
      return this.service.create(dto);
    }

    @Get()
    findAll(): Promise<typeof Entity[]> {
      return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<typeof Entity> {
      return this.service.findOne(+id);
    }

    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() dto: typeof UpdateDto,
    ): Promise<typeof Entity> {
      return this.service.update(+id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
      return this.service.remove(+id);
    }
  }
  return DefaultControllerHost;
}
