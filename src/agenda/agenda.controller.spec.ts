import { Test, TestingModule } from '@nestjs/testing';
import { AgendaController } from './agenda.controller';
import { createMock } from '@golevelup/ts-jest';
import { CriarNovoSlotDeAgenda } from '../_business/agenda/casos-de-uso/criar-novo-slot-de-agenda.feat';
import { NotAcceptableException } from '@nestjs/common';

describe('AgendaController', () => {
  let controller: AgendaController;
  let useCase: CriarNovoSlotDeAgenda;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendaController],
      providers: [
        {
          provide: CriarNovoSlotDeAgenda,
          useValue: createMock<CriarNovoSlotDeAgenda>(),
        },
      ],
    }).compile();

    controller = module.get<AgendaController>(AgendaController);
    useCase = module.get<CriarNovoSlotDeAgenda>(CriarNovoSlotDeAgenda);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve rejeitar uma data inválida', async () => {
    await expect(controller.create({ inicio: '' }, { id: 1 })).rejects.toThrow(
      expect.any(NotAcceptableException),
    );
  });

  it('deve aceitar e transformar uma data válida', async () => {
    await expect(
      controller.create({ inicio: '2021-10-08T01:00:00' }, { id: 1 }),
    ).resolves;
    expect(useCase.execute).toHaveBeenCalledWith({
      inicio: new Date('2021-10-08T01:00:00'),
      idUsuario: 1,
    });
  });
});
