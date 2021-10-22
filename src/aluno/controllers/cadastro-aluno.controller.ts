import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CadastrarAluno } from '../../_business/alunos/casos-de-uso/cadastrar-aluno.feat';
import { CreateAlunoDto } from '../../_adapters/alunos/dto/create-aluno.dto';
import { User } from '../../_adapters/auth/decorators/user.decorator';
import { Usuario } from '../../_business/usuarios/entidades/usuario.entity';
import {
  UsuarioInvalidoError,
  UsuarioNaoEncontradoError,
} from '../../_business/usuarios/erros/erros';
import { Auth } from '../../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';

@Controller('cadastro-aluno')
export class CadastroAlunoController {
  constructor(
    @Inject(CadastrarAluno)
    private readonly cadastrarAluno: CadastrarAluno,
  ) {}

  @ApiInternalServerErrorResponse({
    description: 'Erro genérico',
  })
  @Post()
  @Auth(TipoUsuario.ALUNO)
  async cadastrar(
    @Body() dto: CreateAlunoDto,
    @User() user: Usuario,
  ): Promise<void> {
    try {
      await this.cadastrarAluno.execute({
        ...dto,
        usuario: user,
      });
    } catch (e) {
      switch (true) {
        case e instanceof UsuarioNaoEncontradoError:
          throw new NotFoundException(e);
        case e instanceof UsuarioInvalidoError:
          throw new UnprocessableEntityException(e);
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
