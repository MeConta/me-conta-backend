import { Test, TestingModule } from '@nestjs/testing';
import { AgendaController } from './agenda.controller';
import { createMock } from '@golevelup/ts-jest';
import { CriarNovoSlotDeAgenda } from '../../../_business/agenda/casos-de-uso/criar-novo-slot-de-agenda.feat';
import { CreateSlotAgendaDto } from '../../../_adapters/agenda/dto/create-slot-agenda.dto';
import * as moment from 'moment';

describe('AgendaController', () => {
  let controller: AgendaController;
  let useCase: CriarNovoSlotDeAgenda;
  const request = {
    slots: [{ inicio: moment().toDate() }],
  } as CreateSlotAgendaDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CriarNovoSlotDeAgenda,
          useValue: createMock<CriarNovoSlotDeAgenda>(),
        },
      ],
      controllers: [AgendaController],
    }).compile();

    controller = module.get<AgendaController>(AgendaController);
    useCase = module.get<CriarNovoSlotDeAgenda>(CriarNovoSlotDeAgenda);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve cadastrar um slot de agenda', async () => {
    await controller.create(request, { id: 1 });
    expect(useCase.execute).toBeCalled();
  });
});
