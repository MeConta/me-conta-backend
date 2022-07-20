import { AtualizarVoluntario } from '../../../_business/voluntarios/casos-de-uso/atualizar-voluntario.feat';
import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { AtualizarVoluntarioController } from './atualizar-voluntario.controller';
import { AtualizarAlunoDto } from '../../../_adapters/alunos/dto/atualizar-aluno.dto';
import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import { CamposDeFormacaoError } from '../../../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';

describe('Atualizar Voluntário Controller', () => {
  let controller: AtualizarVoluntarioController;
  let useCase: AtualizarVoluntario;
  const mockAtualizarVoluntario = createMock<AtualizarVoluntario>();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: AtualizarVoluntario,
          useValue: mockAtualizarVoluntario,
        },
      ],
      controllers: [AtualizarVoluntarioController],
    }).compile();
    controller = module.get<AtualizarVoluntarioController>(
      AtualizarVoluntarioController,
    );
    useCase = module.get<AtualizarVoluntario>(AtualizarVoluntario);
  });

  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });

  it('Deve dar erro de Voluntário não encontrado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new VoluntarioNaoEncontradoError());
    await expect(() =>
      controller.atualizar(expect.any(Number), expect.any(AtualizarAlunoDto)),
    ).rejects.toThrow(NotFoundException);
  });

  it('Deve dar erro de campos de formação', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new CamposDeFormacaoError([]));
    await expect(() =>
      controller.atualizar(expect.any(Number), expect.any(AtualizarAlunoDto)),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error());
    await expect(() =>
      controller.atualizar(expect.any(Number), expect.any(AtualizarAlunoDto)),
    ).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve chamar voluntário service com parametros corretos', async () => {
    jest.spyOn(useCase, 'execute').mockResolvedValue();
    const atualizarInput = {
      bio: 'lorem ipslom',
      link: 'wwww.meconta.com',
      aprovado: true,
    };
    await useCase.execute(12, atualizarInput);
    expect(mockAtualizarVoluntario.execute).toBeCalledWith(12, atualizarInput);
  });
});
