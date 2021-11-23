import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';

export interface SlotAgenda {
  id: number;
  voluntario: Voluntario;
  inicio: Date;
  fim: Date;
}
