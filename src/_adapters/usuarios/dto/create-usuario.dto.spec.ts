import { plainToClass } from 'class-transformer';
import { CreateUsuarioDto } from './create-usuario.dto';

describe('CreateUsuarioDto', () => {
  it('should ', () => {
    const transformed = plainToClass(CreateUsuarioDto, {
      nome: 'mock  ',
    });
    expect(transformed.nome).toEqual('mock');
  });
});
