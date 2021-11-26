import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';

export interface SlotAgenda {
  id: number;
  voluntario: Promise<Voluntario>;
  inicio: Date;
  fim: Date;
}
