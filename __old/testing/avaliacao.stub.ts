import { CreateAvaliacaoDto } from '../avaliacao/dto/create-avaliacao.dto';
import { Consulta } from '../consulta/entities/consulta.entity';
import { UpdateAvaliacaoDto } from '../avaliacao/dto/update-avaliacao.dto';

export class AvaliacaoStub {
  static getCreateDto(): CreateAvaliacaoDto {
    return {
      consulta: {
        id: 1,
      } as Consulta,
      anonimo: true,
      mostrar: true,
      comentario: 'lorem dolor sit amet',
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
