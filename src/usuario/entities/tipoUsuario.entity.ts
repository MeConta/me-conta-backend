import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo-usuario')
export class TipoUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({
    nullable: true
  })
  descricao: string;
}
