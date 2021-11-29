import { ListarSlotsAgenda } from '../../../_business/agenda/casos-de-uso/listar-slots.agenda.feat';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ListarSlotsAgendaController } from './listar-slots-agenda.controller';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('ListarSlotsAgendaController', () => {
  let controller: ListarSlotsAgendaController;
  let useCase: ListarSlotsAgenda;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ListarSlotsAgenda,
          useValue: createMock<ListarSlotsAgenda>(),
        },
      ],
      controllers: [ListarSlotsAgendaController],
    }).compile();
    controller = module.get<ListarSlotsAgendaController>(
      ListarSlotsAgendaController,
    );
    useCase = module.get<ListarSlotsAgenda>(ListarSlotsAgenda);
  });

  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });
  it('Deve chamar o caso de uso passando um atendente ID', async () => {
    await controller.get({ id: 1 });
    expect(useCase.execute).toBeCalledWith(1);
  });
  it('Deve chamar o caso de uso sem passar atendente ID', async () => {
    await controller.get();
    expect(useCase.execute).toBeCalledWith(undefined);
  });
  it('Deve Dar erro de voluntário não encontrado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new VoluntarioNaoEncontradoError());
    await expect(() => controller.get(expect.any(Number))).rejects.toThrow(
      NotFoundException,
    );
  });
  it('Deve Dar erro de genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error());
    await expect(() => controller.get(expect.any(Number))).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
