import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import {
  AtendimentoNaoAconteceuError,
  CriarAtendimento,
} from '../../../_business/atendimentos/casos-de-uso/criar-atendimento.feat';
import { AlunoNaoEncontradoError } from '../../../_business/alunos/casos-de-uso/atualizar-aluno.feat';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { CreateAtendimentoDto } from '../../../_adapters/atendimentos/dto/create-atendimento.dto';

@ApiTags('Atendimento')
@Controller('/atendimento')
export class CriarAtendimentoController {
  constructor(
    @Inject(CriarAtendimento)
    private readonly criarAtendimento: CriarAtendimento,
  ) {}

  @Post()
  @Auth(TipoUsuario.ATENDENTE)
  async criar(@Body() dto: CreateAtendimentoDto): Promise<void> {
    try {
      await this.criarAtendimento.execute(dto);
    } catch (e) {
      switch (true) {
        case e instanceof VoluntarioNaoEncontradoError:
          throw new NotFoundException(e);
        case e instanceof AlunoNaoEncontradoError:
          throw new NotFoundException(e);
        case e instanceof AtendimentoNaoAconteceuError:
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
