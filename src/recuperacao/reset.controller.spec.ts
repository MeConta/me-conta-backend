import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import {
  RecuperacaoNotFoundError,
  ResetSenha,
  ResetSenhaInput,
} from '../_business/recuperacao/casos-de-uso/reset-senha.feat';
import { ResetController } from './reset.controller';
import { DEFAULT_PASSWORD } from '../../jest.setup';
import { NotFoundException } from '@nestjs/common';

describe('Reset de Senha Controller', () => {
  let controller: ResetController;
  let useCase: ResetSenha;

  const request: ResetSenhaInput = {
    hash: 'HASHED',
    senha: DEFAULT_PASSWORD,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ResetSenha,
          useValue: createMock<ResetSenha>(),
        },
      ],
      controllers: [ResetController],
    }).compile();
    controller = module.get<ResetController>(ResetController);
    useCase = module.get<ResetSenha>(ResetSenha);
  });
  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });
  it('Deve cadastrar um pedido de recuperação', async () => {
    await controller.reset(request);
    expect(useCase.execute).toBeCalledWith(request);
  });
  it('Deve dar erro UnprocessableEntityException caso o registro não exista', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new RecuperacaoNotFoundError());
    await expect(() => controller.reset(request)).rejects.toThrow(
      NotFoundException,
    );
  });
});
