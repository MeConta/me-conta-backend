import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('slot-agenda')
export class SlotAgendaDbEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idAtendente: string;

  @Column()
  inicio: number;

  @Column()
  fim: number;
}
