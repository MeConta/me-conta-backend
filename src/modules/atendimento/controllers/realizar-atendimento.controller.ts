import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import {
  ConsultaNaoAconteceuError,
  RealizarAtendimento,
} from '../../../_business/atendimentos/casos-de-uso/realizar-atendimento.feat';
import { AlunoNaoEncontradoError } from '../../../_business/alunos/casos-de-uso/atualizar-aluno.feat';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { RealizarAtendimentoDto } from '../../../_adapters/atendimentos/dto/realizar-atendimento.dto';

@ApiTags('Atendimento')
@Controller('/atendimento/realizar/')
export class RealizarAtendimentoController {
  constructor(
    @Inject(RealizarAtendimento)
    private readonly realizarAtendimento: RealizarAtendimento,
  ) {}

  @Post()
  @Auth(TipoUsuario.ATENDENTE)
  async realizar(@Body() dto: RealizarAtendimentoDto): Promise<void> {
    try {
      await this.realizarAtendimento.execute(dto);
    } catch (e) {
      switch (true) {
        case e instanceof VoluntarioNaoEncontradoError:
          throw new NotFoundException(e);
        case e instanceof AlunoNaoEncontradoError:
          throw new NotFoundException(e);
        case e instanceof ConsultaNaoAconteceuError:
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
