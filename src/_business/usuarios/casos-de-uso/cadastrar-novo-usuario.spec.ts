import {
  CadastrarNovoUsuario,
  DuplicatedError,
  NoAdminCreationError,
  TipoUsuario,
} from './cadastrar-novo-usuario.feat';
import { InMemoryUsuarioService } from '../../../_adapters/usuarios/services/in-memory-usuario.service';
import { Usuario } from '../entidades/usuario.entity';
import { IHashService } from '../interfaces/hash.service';
import { createMock } from '@golevelup/ts-jest';

describe('Cadastrar novo usuário', () => {
  let usuarioService: InMemoryUsuarioService;
  let passwordService: IHashService;
  let sut: CadastrarNovoUsuario;
  beforeEach(() => {
    usuarioService = new InMemoryUsuarioService();
    passwordService = createMock<IHashService>();
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
