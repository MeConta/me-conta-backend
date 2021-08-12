import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Supervisor } from '../../supervisor/entities/supervisor.entity';
import { Voluntario } from '../../voluntario/entity/voluntario.entity';

@Entity('atendente')
export class Atendente extends Voluntario {
  @Column()
  formado: boolean;

  @Column({
    nullable: true,
  })
  semestre: number;

  @Column({
    nullable: true,
  })
  anoFormacao: number;

  @OneToOne(() => Usuario, {
    nullable: false,
  })
  @JoinColumn()
  usuario: Usuario;

  @OneToOne(() => Supervisor)
  @JoinColumn()
  supervisor: Supervisor;
}
