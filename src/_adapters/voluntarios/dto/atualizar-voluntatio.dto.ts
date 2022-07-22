import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class AtualizarVoluntarioDto {
  @IsOptional()
  @IsBoolean({
    message: '$property deve ser um valor booleano',
  })
  @ApiProperty()
  aprovado?: boolean;

  @IsOptional()
  @IsString({ message: '$property deve ser uma url válida!' })
  @IsUrl()
  @ApiProperty()
  link?: string;

  @IsOptional()
  @ApiProperty()
  bio?: string;
}
