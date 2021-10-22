import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilDbEntity } from '../entidades/perfil.db.entity';
import { Perfil } from '../../../_business/usuarios/entidades/usuario.entity';
import { ICadastrarPerfilService } from '../../../_business/perfil/services/cadastrar-perfil.service';
import { Repository } from 'typeorm';
import { IAtualizarPerfilService } from '../../../_business/perfil/services/atualizar-perfil.service';

@Injectable()
export class TypeormPerfilService
  implements ICadastrarPerfilService, IAtualizarPerfilService
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
}
