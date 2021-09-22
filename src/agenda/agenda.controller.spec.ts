import { Test, TestingModule } from '@nestjs/testing';
import { AgendaController } from './agenda.controller';
import { createMock } from '@golevelup/ts-jest';
import { AgendaService } from './agenda.service';

describe('AgendaController', () => {
  let controller: AgendaController;
  let service: AgendaService;

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
    service = module.get<AgendaService>(AgendaService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar um slot de agenda', async () => {
    jest.spyOn(service, 'criarSlotNovo').mockResolvedValue();
    await controller.create({
      inicio: new Date(2021, 11, 30, 9),
      fim: new Date(2021, 11, 30, 10),
      idAtendente: '1',
    });
    await expect(service.criarSlotNovo).toBeCalled();
  });
});
