import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('slot-agenda')
export class SlotAgendaDbEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idAtendente: number;

  @Column('bigint')
  inicio: number;

  @Column('bigint')
  fim: number;
}
