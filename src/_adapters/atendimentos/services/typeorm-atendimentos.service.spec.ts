import { TypeormAtendimentosService } from './typeorm-atendimentos.service';
import { AtendimentosDbEntity } from '../entidades/atendimentos-db.entity';
import { createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import {
  NovoAtendimento,
  StatusAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';

describe('TypeORM Atendimentos Service', () => {
  let service: TypeormAtendimentosService;
  let repository: Repository<AtendimentosDbEntity>;

  beforeAll(() => {
    repository = createMock<Repository<AtendimentosDbEntity>>({
      create(): AtendimentosDbEntity {
        return createMock<AtendimentosDbEntity>();
      },
      find(): Promise<AtendimentosDbEntity[]> {
        return Promise.resolve([
          createMock<AtendimentosDbEntity>({
            id: expect.any(Number),
            slotAgenda: Promise.resolve(
              createMock({ fim: new Date('December 17, 1995 03:24:00') }),
            ),
          }),
          createMock<AtendimentosDbEntity>({
            slotAgenda: Promise.resolve(createMock({ fim: new Date() })),
          }),
        ]);
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

  it('Deve fazer uma busca pelo id do atendimento', () => {
    const atendimentoId = expect.any(Number);
    service.buscar(atendimentoId);
    expect(repository.findOne).toBeCalledWith(atendimentoId);
  });

  it('Deve fazer uma busca por agendamentos antigos em aberto', async () => {
    const atendimentos = await service.buscarAntigosEmAberto();

    expect(atendimentos.length).toBe(2);

    const currentTime = new Date();
    expect((await atendimentos[0].slotAgenda).fim.getTime()).toBeLessThan(
      currentTime.getTime(),
    );

    expect(repository.find).lastCalledWith({
      relations: ['slotAgenda'],
      where: {
        slotAgenda: {
          fim: {
            _getSql: undefined,
            _multipleParameters: false,
            _objectLiteralParameters: undefined,
            _type: 'lessThan',
            _useParameter: true,
            _value: expect.any(Date),
          },
        },
        status: StatusAtendimento.ABERTO,
      },
    });
  });
});
