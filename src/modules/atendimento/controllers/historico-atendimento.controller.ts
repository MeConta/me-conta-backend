import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AlunoNaoEncontradoError } from '../../../_business/alunos/casos-de-uso/atualizar-aluno.feat';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { HistoricoAtendimento } from '../../../_business/atendimentos/casos-de-uso/historico-atendimento.feat';
import { User } from '../../../_adapters/auth/decorators/user.decorator';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';
import { Atendimento } from '../../../_business/atendimentos/entidades/atendimentos.entity';

@ApiTags('Atendimento')
@Controller('/atendimento')
export class HistoricoAtendimentoController {
  constructor(
    @Inject(HistoricoAtendimento)
    private readonly historicoAtendimento: HistoricoAtendimento,
  ) {}

  @Get()
  @Auth(TipoUsuario.ALUNO)
  async historico(
    @User() user: Pick<ITokenUser, 'id'>,
  ): Promise<Atendimento[]> {
    try {
      return this.historicoAtendimento.execute(user.id);
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
