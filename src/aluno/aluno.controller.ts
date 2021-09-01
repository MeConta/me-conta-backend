import { Body, Param, Patch, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { DefaultController } from '../default.controller';
import { Aluno } from './entities/aluno.entity';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Aluno')
export class AlunoController extends DefaultController(
  'aluno',
  Aluno,
  AlunoService,
  CreateAlunoDto,
  UpdateAlunoDto,
) {
  @Post()
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  create(@Body() dto: CreateAlunoDto): Promise<Aluno> {
    return super.create(dto);
  }

  @Patch(':id')
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  update(@Param('id') id: number, @Body() dto: UpdateAlunoDto): Promise<Aluno> {
    return super.update(id, dto);
  }
}
