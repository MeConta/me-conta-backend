import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DefaultEntity } from '../../default.entity';

@Entity('tipo-usuario')
export class TipoUsuario extends DefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({
    nullable: true,
  })
  descricao: string;
}
