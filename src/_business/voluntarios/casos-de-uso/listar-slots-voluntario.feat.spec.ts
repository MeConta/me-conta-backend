import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import * as dayjs from 'dayjs';
import { IBuscarVoluntarios } from '../../voluntarios/services/voluntario.service';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { ListarSlotsVoluntario } from './listar-slots-voluntario.feat';

describe('Listar Slots de Agenda', () => {
  let sut: ListarSlotsVoluntario;
  const voluntarioService = createMock<IBuscarVoluntarios>();
  let voluntarios: Array<Voluntario> = [];
  const dataInicioSlot = dayjs('2021-01-01').toDate();
  const dataFimSlot = dayjs('2021-01-01').add(1, 'hours').toDate();
  beforeEach(async () => {
    sut = new ListarSlotsVoluntario(voluntarioService);
  });
  beforeEach(async () => {
    voluntarios = new Array<Voluntario>(2)
      .fill({
        ...createMock<Voluntario>(),
        aprovado: true,
        slots: [
          {
            id: null,
            inicio: dayjs().add(1, 'day').toDate(),
            fim: dayjs().add(1, 'day').add(1, 'hours').toDate(),
            voluntario: Promise.resolve(createMock<Voluntario>()),
          },
          {
            id: null,
            inicio: dayjs().subtract(1, 'day').toDate(),
            fim: dayjs().subtract(1, 'day').add(1, 'hours').toDate(),
            voluntario: Promise.resolve(createMock<Voluntario>()),
          },
          {
            id: null,
            inicio: dataInicioSlot,
            fim: dataFimSlot,
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

  it('Deve listar os slots de um atendente a partir da data atual', async () => {
    jest.spyOn(voluntarioService, 'buscar').mockResolvedValue([voluntarios[0]]);
    const response = await sut.execute(1);
    expect(response).toHaveLength(1);
  });

  it('Deve listar os slots de um atendente em uma data selecionada', async () => {
    jest.spyOn(voluntarioService, 'buscar').mockResolvedValue([voluntarios[0]]);
    const response = await sut.execute(1, dataInicioSlot);
    expect(response).toHaveLength(1);
  });

  it('Deve dar erro de voluntario não encontrado', async () => {
    jest.spyOn(voluntarioService, 'buscar').mockResolvedValue([]);
    await expect(() => sut.execute(1)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });
});
