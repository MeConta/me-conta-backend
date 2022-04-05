import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SlotAgenda } from '../../../_business/agenda/entidades/slot-agenda.entity';
import { TypeormDefaultEntity } from '../../entidades/typeorm.default.entity';
import { Voluntario } from '../../../_business/voluntarios/entidades/voluntario.entity';
import { VoluntarioDbEntity } from '../../voluntarios/entidades/voluntario-db.entity';

@Entity('slot-agenda')
export class SlotAgendaDbEntity
  extends TypeormDefaultEntity
  implements SlotAgenda
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  voluntarioId: number;

  @ManyToOne(() => VoluntarioDbEntity, (voluntario) => voluntario.id, {
    lazy: true,
  })
  @JoinColumn({
    name: 'voluntarioId',
  })
  voluntario: Promise<Voluntario>;

  @Column()
  inicio: Date;

  @Column()
  fim: Date;
}
