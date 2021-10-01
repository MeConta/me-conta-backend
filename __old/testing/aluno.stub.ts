import { CreateAlunoDto } from '../aluno/dto/create-aluno.dto';
import { UsuarioStub } from '../../src/testing/usuario.stub';
import { GrauEnsinoMedio, TipoEscola } from '../aluno/entities/aluno.enum';
import { Aluno } from '../aluno/entities/aluno.entity';
import { UpdateAlunoDto } from '../aluno/dto/update-aluno.dto';

export class AlunoStub {
  static getCreateDto(): CreateAlunoDto {
    return {
      ...UsuarioStub.getCreateDto(),
      tipoEscola: TipoEscola.PUBLICA,
      grauEnsinoMedio: GrauEnsinoMedio.PRIMEIRO,
    };
  }

  static getUpdateDto(): UpdateAlunoDto {
    return {
      tipoEscola: TipoEscola.PUBLICA,
    };
  }

  static getEntity(): Aluno {
    return {
      id: 1,
      dataAlteracao: new Date(),
      tipoEscola: TipoEscola.PUBLICA,
      dataCriacao: new Date(),
      usuario: UsuarioStub.getEntity(),
      grauEnsinoMedio: GrauEnsinoMedio.PRIMEIRO,
    };
  }
}
