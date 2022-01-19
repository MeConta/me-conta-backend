import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './TaskService';
import { createMock } from '@golevelup/ts-jest';
import { TypeormAtendimentosService } from '../../../_adapters/atendimentos/services/typeorm-atendimentos.service';
import {
  Atendimento,
  StatusAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';

class AtendimentoServiceMock {
  buscarAntigosEmAberto(): Promise<Atendimento[]> {
    return Promise.resolve([{ id: expect.any(Number) } as Atendimento]);
  }
}

let taskService: TasksService;
let atendimentoServiceMock: TypeormAtendimentosService;
describe('Tasks Service', function () {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TypeormAtendimentosService,
          useValue: createMock<TypeormAtendimentosService>(
            new AtendimentoServiceMock(),
          ),
        },
        TasksService,
      ],
    }).compile();
    taskService = module.get<TasksService>(TasksService);
    atendimentoServiceMock = module.get<TypeormAtendimentosService>(
      TypeormAtendimentosService,
    );
  });
  it('Deve ser definido', async () => {
    expect(taskService).toBeDefined();
  });
  it('Deve consultar os atendimentos antigos', async () => {
    await taskService.realizaAtendimentosAntigos();
    expect(atendimentoServiceMock.buscarAntigosEmAberto).toBeCalled();
  });
  it('Deve atualizar status de todos os atendimentos para realizado', async () => {
    await taskService.realizaAtendimentosAntigos();
    expect(atendimentoServiceMock.atualizarStatus).toBeCalledWith(
      expect.any(Number),
      StatusAtendimento.REALIZADO,
    );
  });
});
