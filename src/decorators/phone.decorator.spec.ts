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
  it('Deve validar um telefone celular com DDD correto', async () => {
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
  it('Deve dar erro ao utilizar um telefone celular com DDD inválido', async () => {
    await expect(
      target.transform(
        <Testing>{
          test: '01912345678',
        },
        metadata,
      ),
    )
      .rejects.toThrow(BadRequestException)
      .catch((err) =>
        expect(err.getResponse().message).toEqual(['test is not valid DDD']),
      );
  });
  it('Deve dar erro ao utilizar um telefone celular inválido', async () => {
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
  it('Deve validar um telefone residencial com DDD correto', async () => {
    await expect(
      target.transform(
        <Testing>{
          test: '1133122626',
        },
        metadata,
      ),
    ).resolves.toEqual({
      test: '1133122626',
    } as Testing);
  });
  it('Deve dar erro ao utilizar um telefone residencial com DDD inválido', async () => {
    await expect(
      target.transform(
        <Testing>{
          test: '0133122626',
        },
        metadata,
      ),
    )
      .rejects.toThrow(BadRequestException)
      .catch((err) =>
        expect(err.getResponse().message).toEqual(['test is not valid DDD']),
      );
  });
  it('Deve dar erro ao utilizar um telefone residencial inválido', async () => {
    await expect(() =>
      target.transform(
        <Testing>{
          test: '11331226266',
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
