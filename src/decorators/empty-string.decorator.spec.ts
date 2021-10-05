import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { IsNotEmptyString } from './empty-string.decorator';

class Testing {
  @IsNotEmptyString()
  test: string;
}

describe('IsNotEmptyString', () => {
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
  it('Deve validar uma string não vazia', async () => {
    await expect(
      target.transform(
        <Testing>{
          test: 'testing',
        },
        metadata,
      ),
    ).resolves.toEqual({
      test: 'testing',
    } as Testing);
  });
  it('Deve dar erro ao utilizar uma string vazia', async () => {
    await expect(() =>
      target.transform(
        <Testing>{
          test: ' ',
        },
        metadata,
      ),
    )
      .rejects.toThrow(BadRequestException)
      .catch((err) =>
        expect(err.getResponse().message).toEqual([
          'test should not be an empty string',
        ]),
      );
  });
});
