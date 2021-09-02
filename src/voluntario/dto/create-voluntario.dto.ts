import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { FrenteAtuacao } from '../../frente-atuacao/entities/frente-atuacao.entity';
import { Transform, Type } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVoluntarioDto extends OmitType(CreateUsuarioDto, [
  'tipoUsuario',
] as const) {
  @IsNotEmpty()
  especializacao: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  instituicao: string;

  @ApiProperty({
    type: () => Number,
    isArray: true,
  })
  @Type(() => FrenteAtuacao)
  @Transform(({ value }) => value.map((obj) => ({ id: +obj })))
  @IsArray()
  @ArrayMinSize(1)
  frentesAtuacao: FrenteAtuacao[];
}
