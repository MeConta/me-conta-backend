import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Supervisor } from '../../supervisor/entities/supervisor.entity';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';
import { FrenteAtuacao } from '../../frente-atuacao/entities/frente-atuacao.entity';

export class UpdateAtendenteDto extends PartialType(CreateUsuarioDto) {
  /**
   * Quick FIX: composição utilizando PartialType e IntersectionType
   * não funcionais com Nest.js.
   */

  @IsNotEmpty()
  @IsOptional()
  descricao: string;

  @IsNotEmpty()
  @IsOptional()
  instituicao: string;

  @ApiProperty({
    type: () => Number,
    isArray: true,
  })
  @Type(() => FrenteAtuacao)
  @Transform(({ value }) => value.map((obj) => ({ id: +obj })))
  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  frentesAtuacao: FrenteAtuacao[];

  @ApiProperty({
    type: () => Number,
  })
  @IsOptional()
  @IsNotEmpty()
  aprovado: boolean;

  @Transform(({ value }) => ({ id: value } as Supervisor))
  @IsOptional()
  supervisor: Supervisor;
}
