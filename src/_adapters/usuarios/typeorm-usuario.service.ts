import { Injectable } from '@nestjs/common';
import {
  ICadastrarNovoUsuario,
  NovoUsuario,
} from '../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Repository } from 'typeorm';
import { UsuarioDbEntity } from './entidades/usuario.db.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IBuscarUsuarioViaEmail } from '../../_business/usuarios/casos-de-uso/buscar-usuario-email.feat';
import { Usuario } from '../../_business/usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaId } from '../../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';

@Injectable()
export class TypeormUsuarioService
  implements ICadastrarNovoUsuario, IBuscarUsuarioViaEmail, IBuscarUsuarioViaId
{
  constructor(
    @InjectRepository(UsuarioDbEntity)
    private readonly repository: Repository<UsuarioDbEntity>,
  ) {}

  async findById(input: number): Promise<Usuario> {
    return this.repository.findOne(input);
  }

  async cadastrar(
    usuario: NovoUsuario & { salt: string; dataTermos: Date },
  ): Promise<UsuarioDbEntity> {
    const entity = this.repository.create(usuario);
    return await this.repository.save(entity);
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }
}
