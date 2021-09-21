import { Test, TestingModule } from '@nestjs/testing';
import { AgendaController } from './agenda.controller';
import { createMock } from '@golevelup/ts-jest';
import { AgendaService } from './agenda.service';

describe('AgendaController', () => {
  let controller: AgendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendaController],
      providers: [
        {
          provide: AgendaService,
          useValue: createMock<AgendaService>(),
        },
      ],
    }).compile();

    controller = module.get<AgendaController>(AgendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
