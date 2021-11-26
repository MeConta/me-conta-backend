import { Test, TestingModule } from '@nestjs/testing';
import {
  RemoverSlotAgenda,
  SlotAgendaNaoEncontradoError,
} from '../../../_business/agenda/casos-de-uso/remover-slot-agenda.feat';
import { createMock } from '@golevelup/ts-jest';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import { RemoverSlotAgendaController } from './remover-slot-agenda.controller';

describe('RemoverSlotAgendaController', () => {
  let controller: RemoverSlotAgendaController;
  let useCase: RemoverSlotAgenda;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RemoverSlotAgenda,
          useValue: createMock<RemoverSlotAgenda>(),
        },
      ],
      controllers: [RemoverSlotAgendaController],
    }).compile();
    controller = module.get<RemoverSlotAgendaController>(
      RemoverSlotAgendaController,
    );
    useCase = module.get<RemoverSlotAgenda>(RemoverSlotAgenda);
  });
  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });
  it('Deve chamar o caso de uso', async () => {
    await controller.remover(1);
    expect(useCase.execute).toBeCalledWith(1);
  });
  it('Deve dar não encontrado caso o de slot não exista', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new SlotAgendaNaoEncontradoError());
    await expect(() => controller.remover(expect.any(Number))).rejects.toThrow(
      NotFoundException,
    );
  });
  it('Deve dar não encontrado caso o voluntário não exista ou não seja aprovado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new VoluntarioNaoEncontradoError());
    await expect(() => controller.remover(expect.any(Number))).rejects.toThrow(
      NotFoundException,
    );
  });
  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(Error);
    await expect(() => controller.remover(expect.any(Number))).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
