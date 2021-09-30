import {
  CadastrarNovoUsuario,
  TipoUsuario,
} from './cadastrar-novo-usuario.feat';
import { InMemoryUsuarioService } from '../fakes/in-memory-usuario.service';
import { Usuario } from '../entidades/usuario.entity';

describe('Cadastrar novo usuário', () => {
  let usuarioService: InMemoryUsuarioService;
  let sut: CadastrarNovoUsuario;
  beforeEach(() => {
    usuarioService = new InMemoryUsuarioService();
    sut = new CadastrarNovoUsuario(usuarioService);
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
});
