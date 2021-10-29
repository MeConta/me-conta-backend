import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilDbEntity } from '../entidades/perfil.db.entity';
import { Perfil } from '../../../_business/usuarios/entidades/usuario.entity';
import { Repository } from 'typeorm';
import {
  IAtualizarPerfilService,
  IBuscarPerfilByIdService,
  ICadastrarPerfilService,
} from '../../../_business/perfil/services/perfil.service';

@Injectable()
export class TypeormPerfilService
  implements
    ICadastrarPerfilService,
    IAtualizarPerfilService,
    IBuscarPerfilByIdService
{
  constructor(
    @InjectRepository(PerfilDbEntity)
    private readonly repository: Repository<PerfilDbEntity>,
  ) {}

  async cadastrar(perfil: Perfil): Promise<void> {
    const entity = this.repository.create(perfil);
    await this.repository.save(entity);
  }

  async atualizar(id: number, input: Partial<Perfil>): Promise<void> {
    await this.repository.save({
      id,
      ...input,
    });
  }

  async findById(id: number): Promise<Perfil> {
    return this.repository.findOne(id);
  }
}
