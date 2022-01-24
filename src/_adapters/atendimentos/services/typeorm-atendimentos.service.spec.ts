import { TypeormAtendimentosService } from './typeorm-atendimentos.service';
import { AtendimentosDbEntity } from '../entidades/atendimentos-db.entity';
import { createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { StatusAtendimento } from '../../../_business/atendimentos/entidades/atendimentos.entity';
import { NovoAtendimento } from '../../../_business/atendimentos/entidades/atendimentos.entity';

describe('TypeORM Atendimentos Service', () => {
  let service: TypeormAtendimentosService;
  let repository: Repository<AtendimentosDbEntity>;

  beforeAll(() => {
    repository = createMock<Repository<AtendimentosDbEntity>>({
      create(): AtendimentosDbEntity {
        return createMock<AtendimentosDbEntity>();
      },
    });
    service = new TypeormAtendimentosService(repository);
  });

  it('Deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('Deve salvar status no repository', () => {
    service.atualizarStatus(expect.any(Number), expect.any(StatusAtendimento));
    expect(repository.save).toBeCalledWith({
      id: expect.any(Number),
      status: expect.any(StatusAtendimento),
    });
  });

  it('Deve criar nova entidade de atendimento', () => {
    const novoAtendimento = expect.any(createMock<NovoAtendimento>());
    service.criar(novoAtendimento);
    expect(repository.create).toBeCalledWith(novoAtendimento);
  });

  it('Deve salvar nova entidade de atendimento', () => {
    service.criar(expect.any(createMock<NovoAtendimento>()));
    expect(repository.save).toBeCalledWith(createMock<AtendimentosDbEntity>());
  });

  it('Deve fazer uma busca filtrado por aluno', () => {
    const alunoId = expect.any(Number);
    service.consultar(alunoId);
    expect(repository.find).toBeCalledWith({
      where: {
        aluno: alunoId,
      },
    });
  });
});
