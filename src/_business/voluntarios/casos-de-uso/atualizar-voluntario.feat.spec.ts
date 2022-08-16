import {
  CadastrarVoluntario,
  NovoVoluntario,
} from './cadastrar-voluntario.feat';
import { IBuscarPerfilByIdService } from '../../perfil/services/perfil.service';
import { IBuscarVoluntarioViaId } from '../services/voluntario.service';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { createMock } from '@golevelup/ts-jest';
import { Perfil } from '../../usuarios/entidades/usuario.entity';
import { faker } from '@faker-js/faker';
import { AtualizarVoluntario } from './atualizar-voluntario.feat';
import { VoluntarioOutput } from '../dtos/voluntario.dto';

describe('Atualizar Voluntário', () => {
  const voluntarios: NovoVoluntario[] = [];
  const voluntarioService = createMock<IBuscarVoluntarioViaId>();
  const perfilService = createMock<IBuscarPerfilByIdService>();
  const cadastroVoluntario = createMock<CadastrarVoluntario>();

  let sut: AtualizarVoluntario;

  beforeEach(async () => {
    faker.setLocale('pt_BR');
    voluntarios[0] = createMock<NovoVoluntario>();
    sut = new AtualizarVoluntario(
      voluntarioService,
      perfilService,
      cadastroVoluntario,
    );
  });

  beforeEach(async () => {
    faker.setLocale('pt_BR');
    jest
      .spyOn(voluntarioService, 'findById')
      .mockResolvedValue(createMock<VoluntarioOutput>());
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
    const bio = faker.lorem.paragraphs(3);
    await sut.execute(0, {
      bio,
    });
    const [voluntario] = voluntarios;
    expect(voluntario.bio).toBe(bio);
  });

  it('Deve atualizar o link do Voluntário', async () => {
    const link = 'www.google.com';
    await sut.execute(0, {
      link,
    });
    expect(cadastroVoluntario.execute).toBeCalledWith({ link });
  });

  it('Deve atualizar o status de aprovado do Voluntário', async () => {
    const aprovado = true;
    await sut.execute(0, {
      aprovado,
    });
    expect(cadastroVoluntario.execute).toBeCalledWith({ aprovado });
  });

  it('Deve chamar cadastro voluntário execute com o novo link', async () => {
    const voluntarioOutput = {
      link: 'www.oldLink.com.br',
    } as VoluntarioOutput;
    const newLink = 'www.newLink.com.br';

    jest
      .spyOn(voluntarioService, 'findById')
      .mockResolvedValue(voluntarioOutput);

    await sut.execute(0, {
      link: newLink,
    });

    expect(cadastroVoluntario.execute).toBeCalledWith({
      link: newLink,
    });
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
