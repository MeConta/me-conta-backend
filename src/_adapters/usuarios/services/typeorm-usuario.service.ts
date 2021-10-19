import { Injectable } from '@nestjs/common';
import {
  ICadastrarNovoUsuario,
  NovoUsuario,
} from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Repository } from 'typeorm';
import { UsuarioDbEntity } from '../entidades/usuario.db.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IBuscarUsuarioViaEmail } from '../../../_business/usuarios/casos-de-uso/buscar-usuario-email.feat';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaId } from '../../../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';
import {
  IAtualizarUsuario,
  IAtualizarUsuarioService,
} from '../../../_business/usuarios/casos-de-uso/atualizar-usuario.feat';

@Injectable()
export class TypeormUsuarioService
  implements
    ICadastrarNovoUsuario,
    IBuscarUsuarioViaEmail,
    IBuscarUsuarioViaId,
    IAtualizarUsuarioService
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

  async atualizar(id: number, input: IAtualizarUsuario): Promise<Usuario> {
    return this.repository.save({
      ...input,
      id,
    });
  }
}
