import { CreateAvaliacaoDto } from '../avaliacao/dto/create-avaliacao.dto';
import { Aluno } from '../aluno/entities/aluno.entity';
import { Consulta } from '../consulta/entities/consulta.entity';
import { UpdateAvaliacaoDto } from '../avaliacao/dto/update-avaliacao.dto';

export class AvaliacaoStub {
  static getCreateDto(): CreateAvaliacaoDto {
    return {
      aluno: {
        id: 1,
      } as Aluno,
      anonimo: true,
      mostrar: true,
      comentario: 'lorem dolor sit amet',
      consulta: {
        id: 1,
      } as Consulta,
      nota: 5,
    };
  }
  static getUpdateDto(): UpdateAvaliacaoDto {
    return {
      nota: 4,
      aprovado: true,
    };
  }
}
