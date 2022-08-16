import { RecuperacaoController } from './recuperacao.controller';
import { RecuperarSenha } from '../../../_business/recuperacao/casos-de-uso/recuperar-senha.feat';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { faker } from '@faker-js/faker';

describe('Recuperação Controller', () => {
  let controller: RecuperacaoController;
  let useCase: RecuperarSenha;

  faker.setLocale('pt_BR');

  const email = faker.internet.email();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RecuperarSenha,
          useValue: createMock<RecuperarSenha>(),
        },
      ],
      controllers: [RecuperacaoController],
    }).compile();
    controller = module.get<RecuperacaoController>(RecuperacaoController);
    useCase = module.get<RecuperarSenha>(RecuperarSenha);
  });
  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });
  it('Deve cadastrar um pedido de recuperação', async () => {
    await controller.recuperar({ email });
    expect(useCase.execute).toBeCalledWith(email);
  });
  it('Deve retornar, mesmo se der algum erro', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(Error);
    await expect(controller.recuperar({ email })).resolves.not.toThrow();
  });
});
