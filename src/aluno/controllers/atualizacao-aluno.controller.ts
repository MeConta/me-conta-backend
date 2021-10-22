import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import {
  AlunoNaoEncontradoError,
  AtualizarAluno,
} from '../../_business/alunos/casos-de-uso/atualizar-aluno.feat';
import { ApiNoContentResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import {
  Auth,
  AuthParam,
} from '../../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

@Controller('/aluno/atualizar/')
export class AtualizacaoAlunoController {
  constructor(
    @Inject(AtualizarAluno)
    private readonly useCase: AtualizarAluno,
  ) {}

  @Patch(':id')
  @Auth(TipoUsuario.ALUNO, TipoUsuario.ADMINISTRADOR)
  @AuthParam()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Aluno atualizado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Aluno não encontrado',
  })
  async atualizar(@Param('id') id: number, @Body() dto): Promise<void> {
    try {
      await this.useCase.execute(id, dto);
    } catch (e) {
      switch (true) {
        case e instanceof AlunoNaoEncontradoError:
          throw new NotFoundException(e);
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
