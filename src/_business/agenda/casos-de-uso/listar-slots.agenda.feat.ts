import { IBuscarVoluntarios } from '../../voluntarios/services/voluntario.service';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import { Usuario } from '../../usuarios/entidades/usuario.entity';

export type SlotAgendaComVoluntario = Pick<Voluntario, 'slots'> & {
  voluntario: Pick<Usuario, 'id'>;
};

export class ListarSlotsAgenda {
  constructor(private readonly voluntarioService: IBuscarVoluntarios) {}

  async execute(
    atendenteId?: number,
  ): Promise<SlotAgendaComVoluntario | SlotAgendaComVoluntario[]> {
    const search = {
      aprovado: true,
      usuario: {
        tipo: TipoUsuario.ATENDENTE,
      } as Usuario,
    };
    if (atendenteId) {
      search.usuario.id = atendenteId;
    }

    const voluntarios = await this.voluntarioService.buscar(search);
    if (atendenteId && !voluntarios.length) {
      throw new VoluntarioNaoEncontradoError();
    }

    return voluntarios.map<SlotAgendaComVoluntario>((voluntario) => ({
      voluntario: {
        id: voluntario.usuario.id,
      },
      slots: voluntario.slots,
    }));
  }
}
