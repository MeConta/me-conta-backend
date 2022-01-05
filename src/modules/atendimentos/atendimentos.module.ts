import {Inject, Injectable} from "@nestjs/common";
import {TypeormAlunoService} from "../../_adapters/alunos/services/typeorm-aluno.service";
import {IRealizarNovoAtendimentoService} from "../../_adapters/atendimentos/services/atendimentos.service";
import {TypeormAtendimentosService} from "../../_adapters/atendimentos/services/typeorm-atendimentos.service";
import {RealizarAtendimento} from "../../_business/atendimentos/casos-de-uso/realizar-atendimento.feat";
import {TypeormVoluntarioService} from "../../_adapters/voluntarios/services/typeorm-voluntario.service";
import {IBuscarVoluntarioViaId} from "../../_business/voluntarios/services/voluntario.service";
import {IBuscarAlunoViaId} from "../../_business/alunos/casos-de-uso/atualizar-aluno.feat";
import {IDateGreaterThan} from "../../_business/agenda/services/date-time.service";

@Injectable()
class NestRealizarAtendimento extends RealizarAtendimento {
    constructor(
        @Inject(TypeormAtendimentosService)
            atendimentoService: IRealizarNovoAtendimentoService,
        @Inject(TypeormVoluntarioService)
            voluntarioService: IBuscarVoluntarioViaId,
        @Inject(TypeormAlunoService)
            alunoService: IBuscarAlunoViaId,

            dateHelper: IDateGreaterThan,
    ) {
        super(atendimentoService, voluntarioService, alunoService, dateHelper);
    }
}