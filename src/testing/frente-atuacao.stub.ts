import { CreateFrenteAtuacaoDto } from '../frente-atuacao/dto/create-frente-atuacao.dto';
import { UpdateFrenteAtuacaoDto } from '../frente-atuacao/dto/update-frente-atuacao.dto';
import { FrenteAtuacao } from '../frente-atuacao/entities/frente-atuacao.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

export class FrenteAtuacaoStub {
  static getCreateDto(): CreateFrenteAtuacaoDto {
    return {
      nome: 'Teste',
      descricao: 'Descrição Teste',
    };
  }

  static getUpdateDto(): UpdateFrenteAtuacaoDto {
    return {
      nome: 'Alteração Teste',
    };
  }

  static getEntity(): FrenteAtuacao {
    return {
      id: 1,
      nome: 'Teste',
      descricao: 'Teste',
      dataCriacao: new Date(),
      dataAlteracao: new Date(),
    };
  }

  static getEntities(numero = 1): FrenteAtuacao[] {
    return Array<FrenteAtuacao>(numero).fill(this.getEntity());
  }

  static getPaginatedEntities(n = 1): Pagination<FrenteAtuacao> {
    return {
      items: this.getEntities(n),
      meta: {
        currentPage: 1,
        itemCount: n,
        itemsPerPage: 10,
        totalItems: n,
        totalPages: 1,
      },
    };
  }
}
