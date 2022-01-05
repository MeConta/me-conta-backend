import {
    IAtualizarStatusAtendimentoService,
    IBuscarAtendimentoViaIdService
} from "../../../_adapters/atendimentos/services/atendimentos.service";
import {Atendimento, StatusAtendimento} from "../entidades/atendimentos.entity";
import {AtendimentoNaoEncontradoError, AtualizarAtendimento} from "./atualizar-atendimento.feat";
import {Usuario} from "../../usuarios/entidades/usuario.entity";
import {createMock} from "@golevelup/ts-jest";

class InMemoryAtendimentoService implements IBuscarAtendimentoViaIdService, IAtualizarStatusAtendimentoService {
    public atendimentos: Atendimento[] = [];

    buscar(id: number): Promise<Atendimento> {
        return Promise.resolve(undefined);
    }

    atualizarStatus(id: number, status: StatusAtendimento): Promise<Atendimento> {
        return Promise.resolve(undefined);
    }
}

describe('Atualizar atendimento', () => {
    let atendimentoService: InMemoryAtendimentoService;
    let sut: AtualizarAtendimento;

    beforeEach(async () => {
        atendimentoService = jest.fn().mockImplementation(new InMemoryAtendimentoService());
        sut = new AtualizarAtendimento(atendimentoService);
    });

    it('Deve ser definido', () => {
        expect(sut).toBeDefined();
    });

    it('Deve dar erro de atendimento não encontrado', async () => {
        jest.spyOn(atendimentoService, 'buscar').mockResolvedValue(null);
        await expect(() =>
            sut.execute(0, expect.any(AtualizarAtendimento)),
        ).rejects.toThrow(AtendimentoNaoEncontradoError);
    });

    it('Deve atualizar um atendimento', async () => {
        const atendimento = createMock<Atendimento>();
        jest.spyOn(atendimentoService, 'buscar').mockResolvedValue(atendimento);
        const status = StatusAtendimento.REALIZADO;

        await sut.execute(1, status);
        expect(atendimentoService.atualizarStatus).toBeCalledWith(1, status);
    });


});