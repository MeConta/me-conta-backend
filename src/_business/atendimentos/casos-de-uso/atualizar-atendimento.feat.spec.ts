import {
  IAtualizarStatusAtendimentoService,
  IBuscarAtendimentoViaIdService,
} from '../../../_adapters/atendimentos/services/atendimentos.service';
import {Atendimento, StatusAtendimento,} from '../entidades/atendimentos.entity';
import {AtendimentoNaoEncontradoError, AtualizarAtendimento,} from './atualizar-atendimento.feat';
import {createMock} from '@golevelup/ts-jest';

class InMemoryAtendimentoService
    implements IBuscarAtendimentoViaIdService, IAtualizarStatusAtendimentoService {
    public atendimento: Atendimento = {
        ...createMock<Atendimento>(),
        status: StatusAtendimento.ABERTO
    };

    buscar(id: number): Promise<Atendimento> {
        if (id == 0) {
            return null;
        }
        return Promise.resolve(this.atendimento);
    }

    async atualizarStatus(id: number, status: StatusAtendimento): Promise<Atendimento> {
        this.atendimento = {
            ...this.atendimento,
            status: status,
        } as Atendimento;
        return this.atendimento;
    }
}

describe('Atualizar atendimento', () => {
    let atendimentoService: InMemoryAtendimentoService;
    let sut: AtualizarAtendimento;

    beforeEach(async () => {
        atendimentoService = new InMemoryAtendimentoService();
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
        const status = StatusAtendimento.REALIZADO;
        await sut.execute(1, status);
        expect(atendimentoService.atendimento).toEqual(
            expect.objectContaining({
                status,
            } as Atendimento),
        );
    });
});
