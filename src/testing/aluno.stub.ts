import { CreateAlunoDto } from '../aluno/dto/create-aluno.dto';
import { UsuarioStub } from './usuario.stub';
import { GrauEnsinoMedio, TipoEscola } from '../aluno/entities/aluno.enum';
import { Aluno } from '../aluno/entities/aluno.entity';

export class AlunoStub {
  static getCreateDto(): CreateAlunoDto {
    return {
      usuario: UsuarioStub.getEntity(),
      tipoEscola: TipoEscola.PUBLICA,
      grauEnsinoMedio: GrauEnsinoMedio.PRIMEIRO,
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
