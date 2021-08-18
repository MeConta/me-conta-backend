import { CreateFrenteAtuacaoDto } from '../frente-atuacao/dto/create-frente-atuacao.dto';
import { UpdateFrenteAtuacaoDto } from '../frente-atuacao/dto/update-frente-atuacao.dto';
import { FrenteAtuacao } from '../frente-atuacao/entities/frente-atuacao.entity';

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
}
