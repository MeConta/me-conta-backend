import { UsuarioDto } from './usuario.dto';
import { plainToClass } from 'class-transformer';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { createMock } from '@golevelup/ts-jest';

describe('UsuarioDto', () => {
  const input = createMock<Usuario>();
  let transformed: UsuarioDto;
  beforeEach(() => {
    transformed = plainToClass(UsuarioDto, input);
  });
  it('Deve ser definido', () => {
    expect(transformed).toBeDefined();
  });
});
