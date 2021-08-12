import { Test, TestingModule } from '@nestjs/testing';
import { AtendenteService } from './atendente.service';

describe('AtendenteService', () => {
  let service: AtendenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtendenteService],
    }).compile();

    service = module.get<AtendenteService>(AtendenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
