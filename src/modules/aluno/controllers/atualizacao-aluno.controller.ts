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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AlunoNaoEncontradoError,
  AtualizarAluno,
} from '../../../_business/alunos/casos-de-uso/atualizar-aluno.feat';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  Auth,
  AuthParam,
} from '../../../_adapters/auth/decorators/auth.decorator';
import { AtualizarAlunoDto } from '../../../_adapters/alunos/dto/atualizar-aluno.dto';

@ApiTags('Aluno')
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
  async atualizar(
    @Param('id') id: number,
    @Body() dto: AtualizarAlunoDto,
  ): Promise<void> {
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
