import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import {
  RecuperacaoExpiradaError,
  RecuperacaoNotFoundError,
  ResetSenhaInput,
} from '../../../_business/recuperacao/casos-de-uso/reset-senha.feat';
import { DEFAULT_PASSWORD } from '../../../../jest.setup';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HashController } from './validar-hash.controller';
import { ValidaHash } from '../../../_business/recuperacao/casos-de-uso/validar-hash.feat';

describe('Validaçao do Hash Controller', () => {
  let controller: HashController;
  let useCase: ValidaHash;

  const request: ResetSenhaInput = {
    hash: 'HASHED',
    senha: DEFAULT_PASSWORD,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ValidaHash,
          useValue: createMock<ValidaHash>(),
        },
      ],
      controllers: [HashController],
    }).compile();
    controller = module.get<HashController>(HashController);
    useCase = module.get<ValidaHash>(ValidaHash);
  });
  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });
  it('Deve dar erro NotFoundException caso o registro não exista', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new RecuperacaoNotFoundError());
    await expect(() => controller.validar(request.hash)).rejects.toThrow(
      NotFoundException,
    );
  });
  it('Deve dar erro de UnprocessableEntityException caso a requisição de senha esteja expirada', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new RecuperacaoExpiradaError());
    await expect(() => controller.validar(request.hash)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
});
