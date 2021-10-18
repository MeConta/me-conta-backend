import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { IsPhone } from './phone.decorator';

class Testing {
  @IsPhone()
  test: string;
}

describe('IsPhone', () => {
  let target: ValidationPipe;
  let metadata: ArgumentMetadata;
  beforeEach(() => {
    target = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    metadata = {
      type: 'body',
      metatype: Testing,
    };
  });
  it('Deve validar um telefone', async () => {
    await expect(
      target.transform(
        <Testing>{
          test: '11912345678',
        },
        metadata,
      ),
    ).resolves.toEqual({
      test: '11912345678',
    } as Testing);
  });
  it('Deve dar erro ao utilizar um telefone inválido', async () => {
    await expect(() =>
      target.transform(
        <Testing>{
          test: '11912345678910',
        },
        metadata,
      ),
    )
      .rejects.toThrow(BadRequestException)
      .catch((err) =>
        expect(err.getResponse().message).toEqual(['test is not valid phone']),
      );
  });
});
