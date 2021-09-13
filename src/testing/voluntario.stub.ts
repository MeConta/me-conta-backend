import { CreateVoluntarioDto } from '../voluntario/dto/create-voluntario.dto';
import { UsuarioStub } from './usuario.stub';
import { Voluntario } from '../voluntario/entity/voluntario.entity';
import { FrenteAtuacaoStub } from './frente-atuacao.stub';

export class VoluntarioStub {
  static getCreateDto(): CreateVoluntarioDto {
    return {
      ...UsuarioStub.getCreateDto(),
      descricao: 'Teste Descricao',
      instituicao: 'Inst. Teste',
      frentesAtuacao: [FrenteAtuacaoStub.getEntity()],
    };
  }

  static getEntity(): Voluntario {
    return {
      dataAlteracao: new Date(),
      dataCriacao: new Date(),
      id: 0,
      usuario: UsuarioStub.getEntity(),
      especializacao: 'Teste',
      descricao: 'Teste Descricao',
      instituicao: 'Inst. Teste',
      frentesAtuacao: [FrenteAtuacaoStub.getEntity()],
      aprovado: true,
    };
  }
}
