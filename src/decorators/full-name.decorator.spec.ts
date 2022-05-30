import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { IsFullName } from './full-name.decorator';

class Testing {
  @IsFullName()
  test: string;
}

describe('IsFullName', () => {
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
  it('Deve validar um nome completo', async () => {
    await expect(
      target.transform(
        <Testing>{
          test: 'Teste Teste',
        },
        metadata,
      ),
    ).resolves.toEqual({
      test: 'Teste Teste',
    } as Testing);
  });
  it('Deve dar erro ao cadastrar nome sem sobrenome', async () => {
    await expect(() =>
      target.transform(
        <Testing>{
          test: 'Teste',
        },
        metadata,
      ),
    )
      .rejects.toThrow(BadRequestException)
      .catch((err) =>
        expect(err.getResponse().message).toEqual(['full name required']),
      );
  });
  it('Deve validar um nome com acento', async () => {
    await expect(
      target.transform(
        <Testing>{
          test: 'João áãàâéêèëíîìïóõôòúüùû',
        },
        metadata,
      ),
    ).resolves.toEqual({
      test: 'João áãàâéêèëíîìïóõôòúüùû',
    } as Testing);
  });
  it('Deve validar um sobrenome com apóstrofo', async () => {
    await expect(
      target.transform(
        <Testing>{
          test: "Mathias d'Arras",
        },
        metadata,
      ),
    ).resolves.toEqual({
      test: "Mathias d'Arras",
    } as Testing);
  });
  it('Deve dar erro ao cadastrar nome com sobrenome de 1 caractere', async () => {
    await expect(() =>
      target.transform(
        <Testing>{
          test: 'Teste d',
        },
        metadata,
      ),
    )
      .rejects.toThrow(BadRequestException)
      .catch((err) =>
        expect(err.getResponse().message).toEqual(['full name required']),
      );
  });
  it('Deve dar erro ao cadastrar nome de 1 caractere com sobrenome', async () => {
    await expect(() =>
      target.transform(
        <Testing>{
          test: 'J Teste',
        },
        metadata,
      ),
    )
      .rejects.toThrow(BadRequestException)
      .catch((err) =>
        expect(err.getResponse().message).toEqual(['full name required']),
      );
  });
});
