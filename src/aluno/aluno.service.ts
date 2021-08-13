import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { Repository } from 'typeorm';
import { Erros } from '../erros.enum';
import { UsuarioService } from '../usuario/usuario.service';
import { Tipo } from '../usuario/entities/usuario.enum';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private repository: Repository<Aluno>,
    private usuarioService: UsuarioService,
  ) {}

  async create(dto: CreateAlunoDto) {
    try {
      const usuarioDto: CreateUsuarioDto = {
        ...dto,
        tipoUsuario: Tipo.ALUNO,
      };

      const usuario = await this.usuarioService.create(usuarioDto);

      dto = {
        ...dto,
        usuario,
      };

      const aluno = this.repository.create(dto);

      return await this.repository.save(aluno);
    } catch (e) {
      throw new UnprocessableEntityException(Erros.USUARIO_JA_CADASTRADO);
    }
  }
}
