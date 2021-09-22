import { Test, TestingModule } from '@nestjs/testing';
import { AgendaController } from './agenda.controller';
import { createMock } from '@golevelup/ts-jest';
import { CriarNovoSlotDeAgenda } from '../_business/atendente/agendamentos/casos-de-uso/criar-novo-slot-de-agenda.feat';

describe('AgendaController', () => {
  let controller: AgendaController;

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
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve possuir uma data válida', () => {
    // TODO: Tests
    // await controller.create();
  });
});
