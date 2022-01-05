import { Inject, Injectable } from '@nestjs/common';
import { TypeormAlunoService } from '../../_adapters/alunos/services/typeorm-aluno.service';
import { INovoAtendimentoService } from '../../_adapters/atendimentos/services/atendimentos.service';
import { TypeormAtendimentosService } from '../../_adapters/atendimentos/services/typeorm-atendimentos.service';
import { CriarAtendimento } from '../../_business/atendimentos/casos-de-uso/criar-atendimento.feat';
import { TypeormVoluntarioService } from '../../_adapters/voluntarios/services/typeorm-voluntario.service';
import { IBuscarVoluntarioViaId } from '../../_business/voluntarios/services/voluntario.service';
import { IBuscarAlunoViaId } from '../../_business/alunos/casos-de-uso/atualizar-aluno.feat';
import { IDateGreaterThan } from '../../_business/agenda/services/date-time.service';
import { MomentDateTimeService } from '../../_adapters/agenda/services/moment-date-time.service';

@Injectable()
class NestCriarAtendimento extends CriarAtendimento {
  constructor(
    @Inject(TypeormAtendimentosService)
    atendimentoService: INovoAtendimentoService,
    @Inject(TypeormVoluntarioService)
    voluntarioService: IBuscarVoluntarioViaId,
    @Inject(TypeormAlunoService)
    alunoService: IBuscarAlunoViaId,
    @Inject(MomentDateTimeService)
    dateHelper: IDateGreaterThan,
  ) {
    super(atendimentoService, voluntarioService, alunoService, dateHelper);
  }
}
