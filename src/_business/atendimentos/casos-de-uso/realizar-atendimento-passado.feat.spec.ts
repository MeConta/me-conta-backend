import { RealizarAtendimentoPassado } from './realizar-atendimento-passado.feat';
import { createMock } from '@golevelup/ts-jest';

describe('Realizar atendimento passado', () => {
  let sut: RealizarAtendimentoPassado;
  let atendimentoService;
  beforeEach(async () => {
    atendimentoService = createMock();
    sut = new RealizarAtendimentoPassado(atendimentoService);
  });

  it('Deve ser definido', () => {
    expect(sut).toBeDefined();
  });

  it('Deve atualizar o status dos atendimentos passados', () => {
    sut.execute();
    expect(
      jest.spyOn(atendimentoService, 'realizarPassados'),
    ).toHaveBeenCalled();
  });
});
