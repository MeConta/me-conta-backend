import { Entity, Column } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { Estado, Genero, Tipo } from './usuario.enum';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity('usuario')
export class Usuario extends DefaultEntity {
  constructor(partial: Partial<DefaultEntity>) {
    super(partial);
    Object.assign(this, partial);
  }

  /***
   * @example 'Maria'
   */
  @Column()
  nome: string;

  /***
   * @example 'teste@teste.com'
   */
  @Column({
    unique: true,
  })
  email: string;

  @ApiHideProperty()
  @Column()
  @Exclude()
  senha: string;

  /***
   * ISO8601 datetime
   */
  @Column()
  dataNascimento: Date;

  @Column({
    type: 'varchar',
    enum: Genero,
    default: Genero.PREFIRO_NAO_DECLARAR,
  })
  genero: Genero;

  @Column({
    type: 'varchar',
    enum: Estado,
  })
  UF: Estado;

  /***
   * @example 'Serra Talhada'
   */
  @Column()
  cidade: string;

  /***
   * @example '(82) 91234-5678'
   */
  @Column()
  telefone: string;

  @Column({
    type: 'varchar',
    enum: Tipo,
    default: Tipo.ALUNO,
  })
  tipoUsuario: Tipo;
}
