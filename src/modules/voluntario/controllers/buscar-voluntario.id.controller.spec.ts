import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { BuscarVoluntarioViaIdController } from './buscar-voluntario.id.controller';
import { InternalServerErrorException } from '@nestjs/common';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import { BuscarVoluntarioViaId } from '../../../_business/voluntarios/casos-de-uso/buscar-voluntario.id.feat';

describe('Buscar Voluntário Controller', () => {
  let controller: BuscarVoluntarioViaIdController;
  let useCase: BuscarVoluntarioViaId;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: BuscarVoluntarioViaId,
          useValue: createMock<BuscarVoluntarioViaId>(),
        },
      ],
      controllers: [BuscarVoluntarioViaIdController],
    }).compile();
    controller = module.get<BuscarVoluntarioViaIdController>(
      BuscarVoluntarioViaIdController,
    );
    useCase = module.get<BuscarVoluntarioViaId>(BuscarVoluntarioViaId);
  });

  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });

  it('Deve chamar o caso de uso para retornar voluntário', async () => {
    await controller.buscar(1);
    expect(useCase.execute).toBeCalledWith(1);
  });

  it('Deve dar erro de Voluntário não encontrado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new VoluntarioNaoEncontradoError());
    await expect(() => controller.buscar(1)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });

  it('Deve dar erro genérico', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new InternalServerErrorException());
    await expect(() => controller.buscar(1)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
