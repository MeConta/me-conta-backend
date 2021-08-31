import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVoluntarioDto {
  @ApiProperty()
  @IsNotEmpty()
  aprovado: boolean;
}
