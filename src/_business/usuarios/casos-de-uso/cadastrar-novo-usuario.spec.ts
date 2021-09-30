import {
  CadastrarNovoUsuario,
  DuplicatedError,
  TipoUsuario,
  WeakPasswordError,
} from './cadastrar-novo-usuario.feat';
import { InMemoryUsuarioService } from '../fakes/in-memory-usuario.service';
import { Usuario } from '../entidades/usuario.entity';
import { IHashService } from '../../interfaces/hash.service';
import { createMock } from '@golevelup/ts-jest';
import { IPasswordStrengthService } from '../../interfaces/password-strength.service';

describe('Cadastrar novo usuário', () => {
  let usuarioService: InMemoryUsuarioService;
  let passwordService: IHashService & IPasswordStrengthService;
  let sut: CadastrarNovoUsuario;
  beforeEach(() => {
    usuarioService = new InMemoryUsuarioService();
    passwordService = createMock<IHashService & IPasswordStrengthService>();
    sut = new CadastrarNovoUsuario(usuarioService, passwordService);
  });
  beforeEach(() => {
    jest.spyOn(passwordService, 'getStrength').mockReturnValue(3);
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
        tipoUsuario: TipoUsuario.ALUNO,
        senha: 's3nh4F0rT#',
        salt: 'salt',
      } as Usuario),
    );
  });
  it('Deve dar erro de usuário duplicado', async () => {
    jest.spyOn(usuarioService, 'cadastrar').mockRejectedValue(new Error());
    jest.spyOn(passwordService, 'getStrength').mockReturnValue(3);
    await expect(() =>
      sut.execute({
        nome: 'João',
        email: 'fake@email.com',
        tipo: TipoUsuario.ALUNO,
        senha: 's3nh4F0rT#',
      }),
    ).rejects.toThrow(DuplicatedError);
  });
  it('Deve dar erro de senha fraca', async () => {
    jest.spyOn(passwordService, 'getStrength').mockReturnValue(0);
    await expect(() =>
      sut.execute({
        nome: 'João',
        email: 'fake@email.com',
        tipo: TipoUsuario.ALUNO,
        senha: 'a',
      }),
    ).rejects.toThrow(WeakPasswordError);
  });
});
