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
    expect(useCase.execute).toBeCalledWith({
      tipo: undefined,
      frenteAtuacao: undefined,
      user: {
        roles: [TipoUsuario.ALUNO],
      },
      aprovado: undefined,
      nome: undefined,
    });
  });
  it('Deve chamar o caso de uso com o tipo', async () => {
    await controller.listar(null, {
      tipo: TipoUsuario.ATENDENTE,
    } as VoluntarioParams);
    expect(useCase.execute).toBeCalledWith({
      tipo: TipoUsuario.ATENDENTE,
      user: null,
      frenteAtuacao: undefined,
      aprovado: undefined,
      nome: undefined,
    });
  });
  it('Deve chamar o caso de uso com o tipo e filtro por frente', async () => {
    await controller.listar(
      null,
      {
        tipo: TipoUsuario.ATENDENTE,
      } as VoluntarioParams,
      { frente: 1 } as VoluntarioQuery,
    );
    expect(useCase.execute).toBeCalledWith({
      tipo: TipoUsuario.ATENDENTE,
      frenteAtuacao: 1,
      user: null,
      aprovado: undefined,
      nome: undefined,
    });
  });
  it('Deve chamar o caso de uso com o filtro para status de aprovado', async () => {
    await controller.listar(
      null,
      {
        tipo: TipoUsuario.ATENDENTE,
      } as VoluntarioParams,
      { status: 2 } as VoluntarioQuery,
    );
    expect(useCase.execute).toBeCalledWith({
      tipo: TipoUsuario.ATENDENTE,
      frenteAtuacao: undefined,
      user: null,
      status: 2,
      nome: undefined,
    });
  });
  it('Deve chamar o caso de uso com o filtro para status de reprovado', async () => {
    await controller.listar(
      null,
      {
        tipo: TipoUsuario.ATENDENTE,
      } as VoluntarioParams,
      { status: 1 } as VoluntarioQuery,
    );
    expect(useCase.execute).toBeCalledWith({
      tipo: TipoUsuario.ATENDENTE,
      frenteAtuacao: undefined,
      user: null,
      status: 1,
      nome: undefined,
    });
  });
  it('Deve chamar o caso de uso com o filtro para status em aberto', async () => {
    await controller.listar(
      null,
      {
        tipo: TipoUsuario.ATENDENTE,
      } as VoluntarioParams,
      { status: 3 } as VoluntarioQuery,
    );
    expect(useCase.execute).toBeCalledWith({
      tipo: TipoUsuario.ATENDENTE,
      frenteAtuacao: undefined,
      user: null,
      status: 3,
      nome: undefined,
    });
  });
  it('Deve chamar o caso de uso mostrando todos os usuários', async () => {
    await controller.listar(
      null,
      {
        tipo: TipoUsuario.ATENDENTE,
      } as VoluntarioParams,
      {} as VoluntarioQuery,
    );
    expect(useCase.execute).toBeCalledWith({
      tipo: TipoUsuario.ATENDENTE,
      frenteAtuacao: undefined,
      user: null,
      status: undefined,
      nome: undefined,
    });
  });
});
