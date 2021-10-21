import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { IsPasswordStrong } from './password.decorator';
import { DEFAULT_PASSWORD } from '../../jest.setup';

class Testing {
  @IsPasswordStrong()
  test: string;
}

describe('IsPasswordStrong', () => {
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
  it('Deve validar uma senha forte', async () => {
    await expect(
      target.transform(
        <Testing>{
          test: DEFAULT_PASSWORD,
        },
        metadata,
      ),
    ).resolves.toEqual({
      test: DEFAULT_PASSWORD,
    } as Testing);
  });
  it('Deve dar erro ao utilizar uma senha fraca', async () => {
    await expect(() =>
      target.transform(
        <Testing>{
          test: 'weak',
        },
        metadata,
      ),
    )
      .rejects.toThrow(BadRequestException)
      .catch((err) =>
        expect(err.getResponse().message).toEqual(['test is too weak']),
      );
  });
  it('Deve dar erro ao utilizar uma senha vazia', async () => {
    await expect(() =>
      target.transform(
        <Testing>{
          test: '',
        },
        metadata,
      ),
    )
      .rejects.toThrow(BadRequestException)
      .catch((err) =>
        expect(err.getResponse().message).toEqual(['test is too weak']),
      );
  });
});
