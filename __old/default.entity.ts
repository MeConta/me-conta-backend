import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export abstract class DefaultEntity {
  @ApiProperty({
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiHideProperty()
  @CreateDateColumn()
  @Exclude()
  dataCriacao!: Date;

  @ApiHideProperty()
  @UpdateDateColumn()
  @Exclude()
  dataAlteracao!: Date;

  @ApiHideProperty()
  @DeleteDateColumn()
  @Exclude()
  dataExclusao?: Date;

  constructor(partial: Partial<DefaultEntity>) {
    Object.assign(this, partial);
  }
}
