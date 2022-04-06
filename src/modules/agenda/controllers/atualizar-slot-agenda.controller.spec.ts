import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import {
  AtualizarSlotDeAgenda,
  SlotComMenosDe24HorasError,
  SlotNaAgendaNaoEncontrado,
  SlotOcupadoError,
} from '../../../_business/agenda/casos-de-uso/atualizar-slot-agenda.feat';
import * as dayjs from 'dayjs';

import { AtualizarSlotAgendaController } from './atualizar-slot-agenda.controller';
import { AtualizarSlotAgendaDto } from '../../../_adapters/agenda/dto/atualizar-slot-agenda.dto';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('AtualizarSlotDaAgendaController', () => {
  let controller: AtualizarSlotAgendaController;
  let useCase: AtualizarSlotDeAgenda;
  const request = {
    slot: { inicio: dayjs().toDate() },
  } as AtualizarSlotAgendaDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AtualizarSlotDeAgenda,
          useValue: createMock<AtualizarSlotDeAgenda>(),
        },
      ],
      controllers: [AtualizarSlotAgendaController],
    }).compile();

    controller = module.get<AtualizarSlotAgendaController>(
      AtualizarSlotAgendaController,
    );
    useCase = module.get<AtualizarSlotDeAgenda>(AtualizarSlotDeAgenda);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve chamar o caso de uso para atualização do slot', async () => {
    await controller.update(
      expect.any(AtualizarSlotAgendaDto),
      expect.any(Number),
    );

    expect(useCase.execute).toBeCalled();
  });

  it('Deve dar erro se o slot desejado para atualizar estiver ocupado', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new SlotOcupadoError());
    await expect(() => controller.update(request, 1)).rejects.toThrow(
      ConflictException,
    );
  });

  it('Deve dar erro se o slot a ser atualizado não for encontrado na agenda', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new SlotNaAgendaNaoEncontrado());
    await expect(() => controller.update(request, 1)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('Deve dar erro quando o slot a ser atualizado está com data de início no período de 24 horas', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new SlotComMenosDe24HorasError());
    await expect(() => controller.update(request, 1)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error());
    await expect(() => controller.update(request, 1)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
