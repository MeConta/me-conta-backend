import { Usuario } from '../entidades/usuario.entity';
import { createMock } from '@golevelup/ts-jest';
import { DEFAULT_PASSWORD } from '../../../../jest.setup';
import { IBuscarUsuarioViaId } from './buscar-usuario.id.feat';
import { IBuscarUsuarioViaEmail } from './buscar-usuario-email.feat';
import {
  AtualizarUsuario,
  EmailJaUtilizadoError,
  IAtualizarUsuario,
  IAtualizarUsuarioService,
  UsuarioNaoEncontradoError,
} from './atualizar-usuario.feat';

class InMemoryAtualizarService
  implements
    IBuscarUsuarioViaId,
    IBuscarUsuarioViaEmail,
    IAtualizarUsuarioService
{
  usuario: Usuario = {
    ...createMock<Usuario>(),
    nome: 'Teste',
    email: 'teste@teste.com',
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

  atualizar(id: number, usuario: IAtualizarUsuario) {
    this.usuario = {
      ...this.usuario,
      ...usuario,
    };
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
    await sut.execute(expect.any(Number), {
      nome: 'Novo Nome',
    });
    expect(service.usuario).toEqual(
      expect.objectContaining({
        nome: 'Novo Nome',
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