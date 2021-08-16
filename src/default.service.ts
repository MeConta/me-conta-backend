import {
  Injectable,
  NotFoundException,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Erros } from './erros.enum';

export interface IDefaultService<
  Entity = any,
  createDto = any,
  updateDto = any,
> {
  repository: Repository<Entity>;
  create(dto: createDto): Promise<Entity>;
  findAll(conditions?: FindConditions<Entity>): Promise<Entity[]>;
  findOne(id: number): Promise<Entity>;
  update(id: number, dto: updateDto): Promise<Entity>;
  remove(id: number): Promise<Entity>;
}

export function DefaultService<createDto, updateDto>(
  entity,
): Type<IDefaultService> {
  @Injectable()
  class DefaultServiceHost
    implements IDefaultService<typeof entity, createDto, updateDto>
  {
    @InjectRepository(entity)
    repository: Repository<typeof entity>;

    async create(dto: createDto): Promise<typeof entity> {
      try {
        return await this.repository.save(this.repository.create(dto));
      } catch (e) {
        throw new UnprocessableEntityException(e);
      }
    }

    async findAll(conditions: FindConditions<typeof entity> = null) {
      return this.repository.find(
        conditions
          ? {
              where: conditions,
            }
          : null,
      );
    }

    async findOne(id: number) {
      const usuario = await this.repository.findOne(id);
      if (!usuario) {
        throw new NotFoundException(Erros.NAO_ENCONTRADO);
      }
      return usuario;
    }

    async update(id: number, dto: updateDto) {
      await this.findOne(id);
      try {
        return await this.repository.save<typeof entity>({
          ...dto,
          id,
        });
      } catch (e) {
        throw new UnprocessableEntityException(Erros.PARAMETROS_INCORRETOS);
      }
    }

    async remove(id: number) {
      return this.repository.softRemove([await this.findOne(id)]);
    }
  }
  return DefaultServiceHost;
}
