import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { GrauEnsinoMedio, TipoEscola } from './aluno.enum';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('aluno')
export class Aluno extends DefaultEntity {
  @ApiProperty({
    enum: TipoEscola,
  })
  @Column({
    type: 'varchar',
    enum: TipoEscola,
    default: TipoEscola.PUBLICA,
  })
  tipoEscola: TipoEscola;

  @ApiProperty({
    enum: GrauEnsinoMedio,
  })
  @Column({
    type: 'integer',
    enum: GrauEnsinoMedio,
  })
  grauEnsinoMedio: GrauEnsinoMedio;

  @ApiProperty({
    type: () => Usuario,
  })
  @OneToOne(() => Usuario, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  usuario: Usuario;
}
