import { createMock } from '@golevelup/ts-jest';
import { Atendimento, NovoAtendimento } from '../entidades/atendimentos.entity';
import { IRealizarNovoAtendimentoService } from '../../../_adapters/atendimentos/services/atendimentos.service';
import { RealizarAtendimento } from './realizar-atendimento.feat';

class InMemoryAtendimentoService implements IRealizarNovoAtendimentoService {
  public atendimentos: Atendimento[] = [];
  realizar(atendimento: NovoAtendimento): Promise<void> {
    this.atendimentos.push({
      ...atendimento,
    });
    return Promise.resolve();
  }
}

describe('Realizar atendimento', () => {
  let sut: RealizarAtendimento;
  let atendimentoService: InMemoryAtendimentoService;
  const request = createMock<NovoAtendimento>();

  beforeEach(async () => {
    atendimentoService = new InMemoryAtendimentoService();
    sut = new RealizarAtendimento(atendimentoService);
  });
  it('Deve ser Definido', () => {
    expect(sut).toBeDefined();
  });

  it('Deve realizar um atendimento', async () => {
    await sut.execute(request);
    expect(atendimentoService.atendimentos[0]).toBeDefined();
  });
});
