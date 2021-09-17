import { CreateConsultaDto } from '../../__old/consulta/dto/create-consulta.dto';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { Atendente } from '../../__old/atendente/entities/atendente.entity';
import { Aluno } from '../../__old/aluno/entities/aluno.entity';
import { Agenda } from '../../__old/agenda/entities/agenda.entity';

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
