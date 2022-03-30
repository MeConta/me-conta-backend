import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { TypeormDefaultEntity } from '../../entidades/typeorm.default.entity';

@Entity('usuario')
export class UsuarioDbEntity extends TypeormDefaultEntity implements Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({
    unique: true,
  })
  email: string;

  @ApiHideProperty()
  @Column()
  @Exclude()
  senha: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({
    type: 'simple-enum',
    enum: TipoUsuario,
    default: TipoUsuario.ALUNO,
  })
  tipo: TipoUsuario;

  @Column()
  dataTermos: Date;

  @Column({ nullable: true })
  // @Exclude()
  refreshTokenHashed: string;
}
