import { Injectable } from '@nestjs/common';
import {
  ICadastrarNovoUsuario,
  NovoUsuario,
} from '../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Repository } from 'typeorm';
import { UsuarioDbEntity } from './entidades/usuario.db.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeormUsuarioService implements ICadastrarNovoUsuario {
  constructor(
    @InjectRepository(UsuarioDbEntity)
    private readonly repository: Repository<UsuarioDbEntity>,
  ) {}
  async cadastrar(
    usuario: NovoUsuario & { salt: string; dataTermos: Date },
  ): Promise<void> {
    const entity = this.repository.create(usuario);
    await this.repository.save(entity);
  }
}
