import {
  ObfuscatedVoluntarioOutput,
  VoluntarioOutput,
} from '../../../_business/voluntarios/casos-de-uso/listar-voluntarios.feat';
import {
  AreaAtuacao,
  FrenteAtuacao,
} from '../../../_business/voluntarios/entidades/voluntario.entity';
import { UsuarioDto } from '../../usuarios/dto/usuario.dto';

export class ListaVoluntariosDto
  implements VoluntarioOutput, ObfuscatedVoluntarioOutput
{
  /***
   * @example 2020
   */
  anoFormacao?: number;
  aprovado?: boolean;
  areaAtuacao?: AreaAtuacao;
  bio?: string;
  crp?: string;
  especializacoes?: string;
  formado: boolean;
  /***
   * @enum FrenteAtuacao
   * @type Number
   * @isArray true
   * @example [1]
   */
  frentes?: FrenteAtuacao[];
  instituicao: string;
  semestre?: number;
  usuario: UsuarioDto;
}
