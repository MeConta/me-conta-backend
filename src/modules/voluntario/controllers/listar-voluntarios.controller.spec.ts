import { Test } from '@nestjs/testing';
import { ListarVoluntarios } from '../../../_business/voluntarios/casos-de-uso/listar-voluntarios.feat';
import { createMock } from '@golevelup/ts-jest';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { ListarVoluntariosController } from './listar-voluntarios.controller';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';
import {
  VoluntarioParams,
  VoluntarioQuery,
} from '../../../_adapters/voluntarios/dto/tipo-voluntario.param.dto';

describe('Buscar Voluntários', () => {
  let controller: ListarVoluntariosController;
  let useCase: ListarVoluntarios;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ListarVoluntarios,
          useValue: createMock<ListarVoluntarios>(),
        },
      ],
      controllers: [ListarVoluntariosController],
    }).compile();
    controller = module.get<ListarVoluntariosController>(
      ListarVoluntariosController,
    );
    useCase = module.get<ListarVoluntarios>(ListarVoluntarios);
  });

  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });

  it('Deve chamar o caso de uso com o tipo do usuário logado', async () => {
    await controller.listar({
      roles: [TipoUsuario.ALUNO],
    } as ITokenUser);
    expect(useCase.execute).toBeCalledWith(
      expect.objectContaining({
        roles: [TipoUsuario.ALUNO],
      } as ITokenUser),
      undefined,
      undefined,
    );
  });
  it('Deve chamar o caso de uso com o tipo', async () => {
    await controller.listar(null, {
      tipo: TipoUsuario.ATENDENTE,
    } as VoluntarioParams);
    expect(useCase.execute).toBeCalledWith(
      null,
      TipoUsuario.ATENDENTE,
      undefined,
    );
  });
  it('Deve chamar o caso de uso com o tipo e filtro por frente', async () => {
    await controller.listar(
      null,
      {
        tipo: TipoUsuario.ATENDENTE,
      } as VoluntarioParams,
      { frente: 1 } as VoluntarioQuery,
    );
    expect(useCase.execute).toBeCalledWith(null, TipoUsuario.ATENDENTE, 1);
  });
});
