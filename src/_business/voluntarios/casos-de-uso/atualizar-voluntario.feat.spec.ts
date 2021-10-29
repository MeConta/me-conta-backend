import {
  CadastrarVoluntario,
  NovoVoluntario,
} from './cadastrar-voluntario.feat';
import { IBuscarPerfilByIdService } from '../../perfil/services/perfil.service';
import { IBuscarVoluntarioViaId } from '../services/voluntario.service';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { createMock } from '@golevelup/ts-jest';
import { Bio, Voluntario } from '../entidades/voluntario.entity';
import { Perfil } from '../../usuarios/entidades/usuario.entity';
import { lorem } from 'faker/locale/pt_BR';
import { AtualizarVoluntario } from './atualizar-voluntario.feat';

describe('Atualizar Voluntário', () => {
  const voluntarios: NovoVoluntario[] = [];
  const voluntarioService = createMock<IBuscarVoluntarioViaId>();
  const perfilService = createMock<IBuscarPerfilByIdService>();
  const cadastroVoluntario = createMock<CadastrarVoluntario>();

  let sut: AtualizarVoluntario;

  beforeEach(async () => {
    voluntarios[0] = createMock<NovoVoluntario>();
    sut = new AtualizarVoluntario(
      voluntarioService,
      perfilService,
      cadastroVoluntario,
    );
  });

  beforeEach(async () => {
    jest
      .spyOn(voluntarioService, 'findById')
      .mockResolvedValue(createMock<Voluntario & Bio>());
    jest
      .spyOn(perfilService, 'findById')
      .mockResolvedValue(createMock<Perfil>());
    jest
      .spyOn(cadastroVoluntario, 'execute')
      .mockImplementation(async (args) => {
        voluntarios[0] = { ...args };
      });
  });

  it('Deve ser definido', () => {
    expect(sut).toBeDefined();
  });
  it('Deve atualizar um Voluntário', async () => {
    const bio = lorem.paragraphs(3);
    await sut.execute(0, {
      bio,
    });
    const [voluntario] = voluntarios;
    expect(voluntario.bio).toBe(bio);
  });
  describe('Deve dar erro de Voluntário não encontrado', () => {
    it('Não há voluntário cadastrado', () => {
      jest.spyOn(voluntarioService, 'findById').mockResolvedValue(null);
    });
    it('Não há perfil cadastrado', () => {
      jest.spyOn(perfilService, 'findById').mockResolvedValue(null);
    });
    afterEach(async () => {
      await expect(() => sut.execute(1, {})).rejects.toThrow(
        VoluntarioNaoEncontradoError,
      );
    });
  });
});
