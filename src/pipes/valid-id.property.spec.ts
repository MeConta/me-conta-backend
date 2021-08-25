import { CreateConsultaDto } from '../consulta/dto/create-consulta.dto';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { Atendente } from '../atendente/entities/atendente.entity';
import { Aluno } from '../aluno/entities/aluno.entity';
import { Agenda } from '../agenda/entities/agenda.entity';

describe('ValidIdPipe', () => {
  let target: ValidationPipe;
  let metadata: ArgumentMetadata;

  beforeEach(() => {
    target = new ValidationPipe({
      transform: true,
    });
    metadata = {
      type: 'body',
      metatype: CreateConsultaDto,
      data: '',
    };
  });

  it('validate DTO', async () => {
    await target
      .transform(
        <CreateConsultaDto>{
          aluno: {} as Aluno,
          atendente: {} as Atendente,
          agenda: {} as Agenda,
        },
        metadata,
      )
      .catch((err) => {
        expect(err.message).toBeDefined();
      });
  });

  it('validate empty DTO', async () => {
    await target.transform(<CreateConsultaDto>{}, metadata).catch((err) => {
      expect(err.message).toBeDefined();
    });
  });
});
