import { createMock } from '@golevelup/ts-jest';
import { RealizarAtendimentoController } from './realizar-atendimento.controller';
import {InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {
    ConsultaNaoAconteceuError,
    RealizarAtendimento
} from "../../../_business/atendimentos/casos-de-uso/realizar-atendimento.feat";
import {RealizarAtendimentoDto} from "../../../_adapters/atendimentos/dto/realizar-atendimento.dto";
import {AlunoNaoEncontradoError} from "../../../_business/alunos/casos-de-uso/atualizar-aluno.feat";
import {VoluntarioNaoEncontradoError} from "../../../_business/admin/casos-de-uso/autorizar-voluntario.feat";

describe('Realizar Atendimento Controller', () => {
    let controller: RealizarAtendimentoController;
    const realizarAtendimento = createMock<RealizarAtendimento>();
    beforeEach(async () => {
        controller = new RealizarAtendimentoController(realizarAtendimento);
    });

    it('Deve ser definido', async () => {
        expect(controller).toBeDefined();
    });

    it('Deve chamar o caso de uso para realizar o atendimento', async () => {
        await controller.realizar(expect.any(realizarAtendimento));
        expect(realizarAtendimento.execute).toBeCalledWith(
            expect.any(RealizarAtendimentoDto)
        );
    });

    it('Deve dar erro de Voluntário não encontrado', async () => {
        jest
            .spyOn(realizarAtendimento, 'execute')
            .mockRejectedValue(new VoluntarioNaoEncontradoError());
        await expect(() =>
            controller.realizar(expect.any(RealizarAtendimentoDto)),
        ).rejects.toThrow(NotFoundException);
    });

    it('Deve dar erro de Aluno não encontrado', async () => {
        jest
            .spyOn(realizarAtendimento, 'execute')
            .mockRejectedValue(new AlunoNaoEncontradoError());
        await expect(() =>
            controller.realizar(expect.any(realizarAtendimento)),
        ).rejects.toThrow(NotFoundException);
    });

    it('Deve dar erro de consulta não aconteceu', async () => {
        jest
            .spyOn(realizarAtendimento, 'execute')
            .mockRejectedValue(new ConsultaNaoAconteceuError());
        await expect(() =>
            controller.realizar(expect.any(realizarAtendimento)),
        ).rejects.toThrow(InternalServerErrorException);
    });

    it('Deve dar erro genérico', async () => {
        jest.spyOn(realizarAtendimento, 'execute').mockRejectedValue(new Error());
        await expect(() =>
            controller.realizar(expect.any(realizarAtendimento)),
        ).rejects.toThrow(InternalServerErrorException);
    });
});
