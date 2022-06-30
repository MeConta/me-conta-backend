import {
  FrenteAtuacao,
  StatusAprovacao,
  Voluntario,
} from '../entidades/voluntario.entity';
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
  status?: StatusAprovacao;
  nome?: string;
}
export class ListarVoluntarios {
  constructor(private readonly voluntarioService: IBuscarVoluntarios) {}

  async execute({
    user,
    tipo,
    frenteAtuacao,
    status,
    nome,
  }: IRequest): Promise<(VoluntarioOutput | ObfuscatedVoluntarioOutput)[]> {
    const search: Partial<Voluntario & { usuario: Usuario }> = {};
    const isAdmin: boolean = user?.roles.includes(TipoUsuario.ADMINISTRADOR);
    const isStudent: boolean = user?.roles.includes(TipoUsuario.ALUNO);
    this.setStatus(status, search, isAdmin, isStudent);

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

  private setStatus(
    status: StatusAprovacao,
    search: Partial<Voluntario & { usuario: Usuario }>,
    isAdmin: boolean,
    isStudent: boolean,
  ): void {
    if (isAdmin) {
      switch (status) {
        case StatusAprovacao.REPROVADO:
          search.aprovado = false;
          break;
        case StatusAprovacao.APROVADO:
          search.aprovado = true;
          break;
        case StatusAprovacao.ABERTO:
          search.aprovado = null;
          break;
      }
    } else if (isStudent) {
      search.aprovado = true;
    }
  }
}
