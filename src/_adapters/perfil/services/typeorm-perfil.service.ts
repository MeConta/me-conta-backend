import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilDbEntity } from '../entidades/perfil.db.entity';
import { Perfil } from '../../../_business/usuarios/entidades/usuario.entity';
import { ICadastrarPerfilService } from '../../../_business/perfil/interfaces/cadastrar-perfil.service';
import { Repository } from 'typeorm';

@Injectable()
export class TypeormPerfilService implements ICadastrarPerfilService {
  constructor(
    @InjectRepository(PerfilDbEntity)
    private readonly repository: Repository<PerfilDbEntity>,
  ) {}

  async cadastrar(perfil: Perfil): Promise<void> {
    const entity = this.repository.create(perfil);
    await this.repository.save(entity);
  }
}
