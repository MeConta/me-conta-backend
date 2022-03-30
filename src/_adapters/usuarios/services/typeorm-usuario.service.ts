import { Injectable } from '@nestjs/common';
import {
  ICadastrarNovoUsuario,
  NovoUsuario,
} from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Repository } from 'typeorm';
import { UsuarioDbEntity } from '../entidades/usuario.db.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaId } from '../../../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';
import {
  IAtualizarUsuario,
  IAtualizarUsuarioService,
  IBuscarUsuarioViaEmailService,
} from '../../../_business/usuarios/services/usuario.service';

@Injectable()
export class TypeormUsuarioService
  implements
    ICadastrarNovoUsuario,
    IBuscarUsuarioViaEmailService,
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
    return this.repository.save(entity);
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async atualizar(id: number, input: IAtualizarUsuario): Promise<Usuario> {
    await this.repository.update(id, {
      ...input,
    });

    const usuarioAtualizado = await this.findById(id);

    console.log(usuarioAtualizado);

    return usuarioAtualizado;
  }
}
