import { Test, TestingModule } from '@nestjs/testing';
import { CadastroVoluntarioController } from './cadastro-voluntario.controller';
import {
  CadastrarVoluntario,
  CamposDeFormacaoError,
} from '../../../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';
import { createMock } from '@golevelup/ts-jest';
import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateVoluntarioDto } from '../../../_adapters/voluntarios/dto/create-voluntario.dto';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import {
  UsuarioInvalidoError,
  UsuarioNaoEncontradoError,
} from '../../../_business/usuarios/erros/usuarios.errors';

describe('Cadastro-voluntario', () => {
  let controller: CadastroVoluntarioController;
  let useCase: CadastrarVoluntario;
  const request = createMock<CreateVoluntarioDto>();
  const user = createMock<Usuario>();
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
    await controller.cadastrar(request, user);
    expect(useCase.execute).toBeCalled();
  });
  it('Deve dar erro de usuário do voluntário não encontrado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new UsuarioNaoEncontradoError());
    await expect(() => controller.cadastrar(request, user)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('Deve dar erro de tipo de usuário inválido', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new UsuarioInvalidoError());
    await expect(() => controller.cadastrar(request, user)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('Deve dar de usuário formado sem os campos', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new CamposDeFormacaoError());
    await expect(() => controller.cadastrar(request, user)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error());
    await expect(() => controller.cadastrar(request, user)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
