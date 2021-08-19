import { Body, Param, Patch, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { DefaultController } from '../default.controller';
import { Aluno } from './entities/aluno.entity';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

export class AlunoController extends DefaultController(
  'aluno',
  Aluno,
  AlunoService,
  CreateAlunoDto,
  UpdateAlunoDto,
) {
  @Post()
  create(@Body() dto: CreateAlunoDto): Promise<Aluno> {
    return super.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlunoDto): Promise<Aluno> {
    return super.update(id, dto);
  }
}
