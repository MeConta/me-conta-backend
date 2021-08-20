import { Test, TestingModule } from '@nestjs/testing';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { FactoryMock } from '../testing/factory.mock';
import { AlunoStub } from '../testing/aluno.stub';

describe('AlunoController', () => {
  let controller: AlunoController;
  let service: AlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunoController],
      providers: [
        {
          provide: AlunoService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<AlunoController>(AlunoController);
    service = module.get<AlunoService>(AlunoService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o create', async () => {
    await controller.create(AlunoStub.getCreateDto());
    expect(service.create).toBeCalled();
  });

  it('deve chamar o update', async () => {
    await controller.update('1', AlunoStub.getUpdateDto());
    expect(service.update).toBeCalled();
  });
});
