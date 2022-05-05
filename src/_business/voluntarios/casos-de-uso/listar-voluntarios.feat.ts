import { FrenteAtuacao, Voluntario } from '../entidades/voluntario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { IBuscarVoluntarios } from '../services/voluntario.service';
import { ITokenUser } from '../../auth/interfaces/auth';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import {
  ObfuscatedVoluntarioOutput,
  VoluntarioOutput,
} from '../dtos/voluntario.dto';

interface IRequest {
  user?: ITokenUser;
  tipo?: TipoUsuario;
  frenteAtuacao?: FrenteAtuacao;
  aprovado?: boolean;
  nome?: string;
}
export class ListarVoluntarios {
  constructor(private readonly voluntarioService: IBuscarVoluntarios) {}

  async execute({
    user,
    tipo,
    frenteAtuacao,
    aprovado,
    nome,
  }: IRequest): Promise<(VoluntarioOutput | ObfuscatedVoluntarioOutput)[]> {
    const isAdmin: boolean = user?.roles.includes(TipoUsuario.ADMINISTRADOR);

    const search: Partial<Voluntario & { usuario: Usuario }> = {};

    if (!isAdmin || aprovado) {
      search.aprovado = true;
    } else if (isAdmin && aprovado === false) {
      search.aprovado = null;
    }

    if (nome) {
      search.usuario = { nome } as Usuario;
    }

    if (tipo in TipoUsuario) {
      search.usuario = { ...search.usuario, tipo } as Usuario;
    }

    if (frenteAtuacao in FrenteAtuacao) {
      search.frentes = [frenteAtuacao];
    }

    const voluntarios = await this.voluntarioService.buscar(search);

    if (isAdmin) {
      return voluntarios;
    }

    return voluntarios.map<ObfuscatedVoluntarioOutput>((voluntario) => {
      const {
        crp,
        especializacoes,
        areaAtuacao,
        formado,
        instituicao,
        frentes,
        bio,
        usuario,
        abordagem,
      } = voluntario;
      // TODO: Melhorar esse mapping
      const { nome, tipo, email, id } = usuario;
      return {
        crp,
        especializacoes,
        areaAtuacao,
        formado,
        instituicao,
        frentes,
        bio,
        abordagem,
        usuario: {
          nome,
          tipo,
          email,
          id,
        },
      } as ObfuscatedVoluntarioOutput;
    });
  }
}
