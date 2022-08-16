import { Usuario } from '../entidades/usuario.entity';
import { createMock } from '@golevelup/ts-jest';
import { DEFAULT_PASSWORD } from '../../../../jest.setup';
import { IBuscarUsuarioViaId } from './buscar-usuario.id.feat';
import {
  AtualizarUsuario,
  EmailJaUtilizadoError,
} from './atualizar-usuario.feat';
import { UsuarioNaoEncontradoError } from '../erros/usuarios.errors';
import { faker } from '@faker-js/faker';
import {
  IAtualizarUsuario,
  IAtualizarUsuarioService,
  IBuscarUsuarioViaEmailService,
} from '../services/usuario.service';

faker.setLocale('pt_BR');

class InMemoryAtualizarService
  implements
    IBuscarUsuarioViaId,
    IBuscarUsuarioViaEmailService,
    IAtualizarUsuarioService
{
  public usuario: Usuario = {
    ...createMock<Usuario>(),
    nome: faker.name.firstName(),
    email: faker.internet.email(),
    senha: DEFAULT_PASSWORD,
  };
  findById(input: number): Promise<Usuario> {
    if (input === 0) {
      return null;
    }
    return Promise.resolve(this.usuario);
  }
  findByEmail(email: string): Promise<Usuario> {
    if (email === 'duplicado@teste.com') {
      return null;
    }
    return Promise.resolve(this.usuario);
  }
  async atualizar(id: number, input: IAtualizarUsuario): Promise<Usuario> {
    this.usuario = {
      ...this.usuario,
      ...input,
    } as Usuario;
    return this.usuario;
  }
}

describe('Atualizar Usuario', () => {
  let sut: AtualizarUsuario;
  let service: InMemoryAtualizarService;
  beforeEach(() => {
    service = new InMemoryAtualizarService();
    sut = new AtualizarUsuario(service);
  });
  it('Deve ser definido', () => {
    expect(sut).toBeDefined();
  });
  it('Deve atualizar um usuário', async () => {
    const nome = 'Novo nome';
    await sut.execute(1, {
      nome,
    });
    expect(service.usuario).toEqual(
      expect.objectContaining({
        nome,
      } as Usuario),
    );
  });
  it('Deve dar erro de usuário não encontrado', async () => {
    await expect(() =>
      sut.execute(0, expect.any(AtualizarUsuario)),
    ).rejects.toThrow(UsuarioNaoEncontradoError);
  });
  it('Deve dar erro de email duplicado', async () => {
    await expect(() =>
      sut.execute(expect.any(Number), {
        email: 'duplicado@teste.com',
      }),
    ).rejects.toThrow(EmailJaUtilizadoError);
  });
});
