import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { MinAge } from './min-age.decorator';

class Testing {
  @MinAge(18)
  test: Date;
}

describe('MinAge', () => {
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
  it('Deve validar ao passar uma idade superior a 18 anos', async () => {
    await expect(
      target.transform(
        <Testing>{
          test: new Date(1996, 7, 12),
        },
        metadata,
      ),
    ).resolves.toEqual({
      test: new Date(1996, 7, 12),
    } as Testing);
  });
  it('Deve dar erro ao utilizar uma senha fraca', async () => {
    await expect(() =>
      target.transform(
        <Testing>{
          test: new Date(),
        },
        metadata,
      ),
    )
      .rejects.toThrow(BadRequestException)
      .catch((err) =>
        expect(err.getResponse().message).toEqual([
          'teste must be greater or equal than 18 years',
        ]),
      );
  });
});
