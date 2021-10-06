import { Test, TestingModule } from '@nestjs/testing';
import { CadastroVoluntarioController } from './cadastro-voluntario.controller';
import {
  CadastrarVoluntario,
  UsuarioNaoEncontradoError,
} from '../_business/usuarios/casos-de-uso/cadastrar-voluntario.feat';
import { createMock } from '@golevelup/ts-jest';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVoluntarioDto } from '../_adapters/voluntarios/dto/create-voluntario.dto';

describe('Cadastro-voluntario', () => {
  let controller: CadastroVoluntarioController;
  let useCase: CadastrarVoluntario;
  const request = createMock<CreateVoluntarioDto>();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CadastrarVoluntario,
          useValue: createMock<CadastrarVoluntario>(),
        },
      ],
      controllers: [CadastroVoluntarioController],
    }).compile();
    controller = module.get<CadastroVoluntarioController>(
      CadastroVoluntarioController,
    );
    useCase = module.get<CadastrarVoluntario>(CadastrarVoluntario);
  });
  it('Deve ser definido', () => {
    expect(controller).toBeDefined();
  });
  it('Deve cadastrar um voluntário', async () => {
    await controller.cadastrar(request);
    expect(useCase.execute).toBeCalled();
  });
  it('Deve dar erro de usuário não encontrado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new UsuarioNaoEncontradoError());
    await expect(() => controller.cadastrar(request)).rejects.toThrow(
      NotFoundException,
    );
  });
  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error());
    await expect(() => controller.cadastrar(request)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
