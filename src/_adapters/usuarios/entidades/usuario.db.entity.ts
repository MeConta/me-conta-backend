import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  Estado,
  Genero,
} from '../../../../__old/usuario/entities/usuario.enum';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

@Entity('usuario')
export class UsuarioDbEntity implements Usuario {
  @PrimaryGeneratedColumn()
  id: number;
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
  @Column({
    nullable: true,
  })
  dataNascimento?: Date;

  @Column({
    type: 'varchar',
    enum: Genero,
    default: Genero.PREFIRO_NAO_DECLARAR,
    nullable: true,
  })
  genero?: Genero;

  @Column({
    type: 'varchar',
    enum: Estado,
    nullable: true,
  })
  UF?: Estado;

  /***
   * @example 'Serra Talhada'
   */
  @Column({ nullable: true })
  cidade?: string;

  /***
   * @example '(82) 91234-5678'
   */
  @Column({ nullable: true })
  telefone?: string;

  @Column({
    type: 'varchar',
    enum: TipoUsuario,
    default: TipoUsuario.ALUNO,
  })
  tipoUsuario?: TipoUsuario;

  @Column()
  @Exclude()
  salt: string;
}
