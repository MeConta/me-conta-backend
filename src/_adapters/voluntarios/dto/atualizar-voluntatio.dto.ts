import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class AtualizarVoluntarioDto {
  @IsOptional()
  @IsBoolean({
    message: '$property deve ser um valor booleano',
  })
  @ApiProperty()
  status?: boolean;

  @IsOptional()
  @IsString({ message: '$property deve ser uma url válida!' })
  @IsUrl()
  @ApiProperty()
  linkSession?: string;

  @IsOptional()
  @ApiProperty()
  bio?: string;
}
