import {
  AreaAtuacao,
  FrenteAtuacao,
} from '../../../_business/voluntarios/entidades/voluntario.entity';
import {
  ObfuscatedVoluntarioOutput,
  VoluntarioComPerfil,
} from '../../../_business/voluntarios/dtos/voluntario.dto';
import { UsuarioDto } from '../../usuarios/dto/usuario.dto';

export class BuscarVoluntariosDto
  implements VoluntarioComPerfil, ObfuscatedVoluntarioOutput
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
  abordagem?: string;
  link?: string;
}
