import { plainToClass } from 'class-transformer';
import { CreateUsuarioDto } from './create-usuario.dto';
import { createMock } from '@golevelup/ts-jest';
import { NovoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { name } from 'faker/locale/pt_BR';
describe('CreateUsuarioDto', () => {
  const input = createMock<NovoUsuario>();
  let transformed: CreateUsuarioDto;
  beforeEach(() => {
    transformed = plainToClass(CreateUsuarioDto, input);
  });
  it('Deve ser definido', () => {
    expect(transformed).toBeDefined();
  });
  it('Deve dar trim no nome', function () {
    const nome = name.findName();
    transformed = plainToClass(CreateUsuarioDto, {
      ...input,
      nome: `${nome}  `,
    });
    expect(transformed.nome).toBe(nome);
  });
});
