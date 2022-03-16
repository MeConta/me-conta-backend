import {
  CadastrarNovoUsuario,
  DuplicatedError,
  ICadastrarNovoUsuario,
  NoAdminCreationError,
  NovoUsuario,
  TipoUsuario,
} from './cadastrar-novo-usuario.feat';
import { Usuario } from '../entidades/usuario.entity';
import {
  IHashGenerateSaltService,
  IHashHashService,
} from '../services/hash.service';
import { createMock } from '@golevelup/ts-jest';

class InMemoryUsuarioService implements ICadastrarNovoUsuario {
  usuarios: Usuario[] = [];
  cadastrar(
    usuario: NovoUsuario & { salt: string; dataTermos: Date },
  ): Promise<Usuario> {
    const len = this.usuarios.push({
      id: this.usuarios.length,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
      senha: usuario.senha,
      salt: usuario.salt,
      dataTermos: usuario.dataTermos,
      refreshTokenHashed:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    });
    return Promise.resolve(this.usuarios[len - 1]);
  }
}

describe('Cadastrar novo usuário', () => {
  let usuarioService: InMemoryUsuarioService;
  let passwordService: IHashGenerateSaltService & IHashHashService;
  let sut: CadastrarNovoUsuario;
  beforeEach(() => {
    usuarioService = new InMemoryUsuarioService();
    passwordService = createMock<IHashGenerateSaltService & IHashHashService>();
    sut = new CadastrarNovoUsuario(usuarioService, passwordService);
  });
  it('Deve cadastrar novo usuário', async () => {
    await sut.execute({
      nome: 'João',
      email: 'fake@email.com',
      tipo: TipoUsuario.ALUNO,
      senha: 's3nh4F0rT#',
    });
    expect(usuarioService.usuarios[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nome: 'João',
        email: 'fake@email.com',
        tipo: TipoUsuario.ALUNO,
        senha: 's3nh4F0rT#',
        salt: 'salt',
      } as Usuario),
    );
  });
  it('Deve dar erro de usuário duplicado', async () => {
    jest.spyOn(usuarioService, 'cadastrar').mockRejectedValue(new Error());
    await expect(() =>
      sut.execute({
        nome: 'João',
        email: 'fake@email.com',
        tipo: TipoUsuario.ALUNO,
        senha: 's3nh4F0rT#',
      }),
    ).rejects.toThrow(DuplicatedError);
  });
  it('Deve dar erro ao tentar cadastrar um administrador', async () => {
    await expect(() =>
      sut.execute({
        nome: 'João',
        email: 'fake@email.com',
        tipo: TipoUsuario.ADMINISTRADOR,
        senha: 's3nh4F0rT#',
      }),
    ).rejects.toThrow(NoAdminCreationError);
  });
});
