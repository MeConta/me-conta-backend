import { createMock } from '@golevelup/ts-jest';
import { Atendimento, NovoAtendimento } from '../entidades/atendimentos.entity';
import { IRealizarNovoAtendimentoService } from '../../../_adapters/atendimentos/services/atendimentos.service';
import { RealizarAtendimento } from './realizar-atendimento.feat';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
import { IBuscarVoluntarioViaId } from '../../voluntarios/services/voluntario.service';

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
  let voluntarioService: IBuscarVoluntarioViaId;
  const request = createMock<NovoAtendimento>();

  beforeEach(async () => {
    atendimentoService = new InMemoryAtendimentoService();
    voluntarioService = createMock<IBuscarVoluntarioViaId>();
    sut = new RealizarAtendimento(atendimentoService, voluntarioService);
  });
  it('Deve ser Definido', () => {
    expect(sut).toBeDefined();
  });

  it('Deve realizar um atendimento', async () => {
    await sut.execute(request);
    expect(atendimentoService.atendimentos[0]).toBeDefined();
  });

  it('Não deve realizar o atendimento se o  voluntário não existir', async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue(null);
    await expect(() => sut.execute(request)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });
});
