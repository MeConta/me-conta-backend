import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import * as dayjs from 'dayjs';
import { IBuscarVoluntarios } from '../../voluntarios/services/voluntario.service';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { ListarSlotsAgenda } from './listar-slots.agenda.feat';

describe('Listar Slots de Agenda', () => {
  let sut: ListarSlotsAgenda;
  const voluntarioService = createMock<IBuscarVoluntarios>();
  let voluntarios: Array<Voluntario> = [];
  beforeEach(async () => {
    sut = new ListarSlotsAgenda(voluntarioService);
  });
  beforeEach(async () => {
    voluntarios = new Array<Voluntario>(2)
      .fill({
        ...createMock<Voluntario>(),
        aprovado: true,
        slots: [
          {
            id: null,
            inicio: dayjs().toDate(),
            fim: dayjs().add(1, 'hours').toDate(),
            voluntario: Promise.resolve(createMock<Voluntario>()),
          },
        ],
        usuario: {
          ...createMock<Usuario>(),
          tipo: TipoUsuario.ATENDENTE,
          id: null,
        },
      })
      .map<Voluntario>((voluntario, i) => ({
        ...voluntario,
        usuario: {
          ...voluntario.usuario,
          id: i + 1,
        },
        slots: voluntario.slots.map((slot, k) => ({ ...slot, id: i + k + 1 })),
      }));
    jest.spyOn(voluntarioService, 'buscar').mockResolvedValue(voluntarios);
  });

  it('Deve ser definido', async () => {
    expect(sut).toBeDefined();
  });

  it('Deve listar os slots de todos os atendente', async () => {
    const response = await sut.execute();
    expect(response).toHaveLength(2);
  });

  it('Deve listar os slots de um atendente', async () => {
    jest.spyOn(voluntarioService, 'buscar').mockResolvedValue([voluntarios[0]]);
    const response = await sut.execute(1);
    expect(response).toHaveLength(1);
  });

  it('Deve dar erro de voluntario não encontrado', async () => {
    jest.spyOn(voluntarioService, 'buscar').mockResolvedValue([]);
    await expect(() => sut.execute(1)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });
});
