import {IBuscarAtendimentoViaIdService
} from "../../../_adapters/atendimentos/services/atendimentos.service";

import {StatusAtendimento} from "../entidades/atendimentos.entity";

export class AtendimentoNaoEncontradoError extends Error {
    public code = 404;
    public message = 'Atendimento não encontrado';
}

export class AtualizarAtendimento {
    constructor(
        private readonly atendimentoService: IBuscarAtendimentoViaIdService
    ) {}
    async execute(id: number, status: StatusAtendimento): Promise<void> {
        const atendimento = await this.atendimentoService.buscar(id);

        if(!atendimento) {
            throw new AtendimentoNaoEncontradoError();
        }

    }
}