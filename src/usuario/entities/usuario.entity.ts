import { Entity, Column } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { Estado, Genero, Tipo } from './usuario.enum';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usuario')
export class Usuario extends DefaultEntity {
  constructor(partial: Partial<DefaultEntity>) {
    super(partial);
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: 'Maria',
  })
  @Column()
  nome: string;

  @ApiProperty({
    example: 'teste@teste.com',
  })
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  senha: string;

  @ApiProperty({
    description: 'ISO8601 datetime',
  })
  @Column()
  dataNascimento: Date;

  @ApiProperty({
    enum: Genero,
  })
  @Column({
    type: 'varchar',
    enum: Genero,
    default: Genero.PREFIRO_NAO_DECLARAR,
  })
  genero: Genero;

  @ApiProperty({
    enum: Estado,
  })
  @Column({
    type: 'varchar',
    enum: Estado,
  })
  UF: Estado;

  @ApiProperty({
    example: 'Serra Talhada',
  })
  @Column()
  cidade: string;

  @ApiProperty({
    example: '(82) 91234-5678',
  })
  @Column()
  telefone: string;

  @ApiProperty({
    enum: Tipo,
  })
  @Column({
    type: 'varchar',
    enum: Tipo,
    default: Tipo.ALUNO,
  })
  tipoUsuario: Tipo;
}
