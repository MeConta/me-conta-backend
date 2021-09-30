import { Injectable } from '@nestjs/common';
import { CadastrarNovoUsuarioService } from '../../_business/usuarios/interfaces/cadastrar-novo-usuario.service';
import { NovoUsuario } from '../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Repository } from 'typeorm';
import { UsuarioDbEntity } from './entidades/usuario.db.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeormUsuarioService implements CadastrarNovoUsuarioService {
  constructor(
    @InjectRepository(UsuarioDbEntity)
    private readonly repository: Repository<UsuarioDbEntity>,
  ) {}
  async cadastrar(usuario: NovoUsuario & { salt: string }) {
    const entity = this.repository.create(usuario);
    await this.repository.save(entity);
  }
}
