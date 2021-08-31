import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export abstract class DefaultEntity {
  @ApiProperty({
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @Exclude()
  dataCriacao!: Date;

  @UpdateDateColumn()
  @Exclude()
  dataAlteracao!: Date;

  @DeleteDateColumn()
  @Exclude()
  dataExclusao?: Date;

  constructor(partial: Partial<DefaultEntity>) {
    Object.assign(this, partial);
  }
}
