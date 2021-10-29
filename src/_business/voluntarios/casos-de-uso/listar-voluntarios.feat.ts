import { Bio, Voluntario } from '../entidades/voluntario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { IBuscarVoluntarios } from '../services/voluntario.service';
import { ITokenUser } from '../../auth/interfaces/auth';
import { Usuario } from '../../usuarios/entidades/usuario.entity';

export type VoluntarioOutput = Voluntario & Bio;
export type ObfuscatedVoluntarioOutput = Omit<
  VoluntarioOutput,
  'aprovado' | 'semestre' | 'anoFormacao'
> & { usuario: Pick<Usuario, 'nome' | 'email' | 'tipo'> };

export class ListarVoluntarios {
  constructor(private readonly voluntarioService: IBuscarVoluntarios) {}

  async execute(
    user?: ITokenUser,
    tipo?: TipoUsuario,
  ): Promise<(VoluntarioOutput | ObfuscatedVoluntarioOutput)[]> {
    const isAdmin: boolean = user?.roles.includes(TipoUsuario.ADMINISTRADOR);

    const search: Partial<Voluntario & { usuario: Usuario }> = {};

    if (!isAdmin) {
      search.aprovado = true;
    }

    if (tipo) {
      search.usuario = { tipo } as Usuario;
    }

    const voluntarios = await this.voluntarioService.buscar(search);

    if (isAdmin) {
      return voluntarios;
    } else {
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
        } = voluntario;
        const { nome, tipo, email, id } = usuario;
        return {
          crp,
          especializacoes,
          areaAtuacao,
          formado,
          instituicao,
          frentes,
          bio,
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
}
