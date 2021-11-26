import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class IdParam {
  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  @IsInt({
    message: '$property deve ser número inteiro',
  })
  @IsPositive({
    message: '$property deve ser número positivo',
  })
  id: number;
}
