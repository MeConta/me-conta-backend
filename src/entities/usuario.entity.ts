import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @Column()
  dataNascimento: Date;

  @Column({ length: 2 })
  UF: string;

  @Column()
  genero: string;

  @Column()
  cidade: string;

  @Column()
  telefone: string;

  @Column()
  email: string;
}
