import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Supervisor } from '../../supervisor/entities/supervisor.entity';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';
import { FrenteAtuacao } from '../../frente-atuacao/entities/frente-atuacao.entity';
import { ConclusaoDto } from '../../voluntario/dto/common/conclusao.dto';

export class UpdateAtendenteDto extends IntersectionType(
  PartialType(CreateUsuarioDto),
  ConclusaoDto,
) {
  /**
   * TODO: fix(#19): composição utilizando PartialType e IntersectionType não funcionais com Nest.js.
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

  @IsOptional()
  @IsNotEmpty()
  aprovado: boolean;

  @ApiProperty({
    type: () => Number,
  })
  @Transform(({ value }) => ({ id: value } as Supervisor))
  @IsOptional()
  supervisor: Supervisor;

  @IsOptional()
  @IsNotEmpty()
  formado?: boolean;
}
