import { Body, Param } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { DefaultController } from '../default.controller';
import { Aluno } from './entities/aluno.entity';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, PatchApi, PostApi } from '../decorators';

@ApiTags('Aluno')
export class AlunoController extends DefaultController(
  'aluno',
  Aluno,
  AlunoService,
  CreateAlunoDto,
  UpdateAlunoDto,
) {
  @PostApi()
  create(@Body() dto: CreateAlunoDto): Promise<Aluno> {
    return super.create(dto);
  }

  @PatchApi()
  @Auth()
  update(@Param('id') id: number, @Body() dto: UpdateAlunoDto): Promise<Aluno> {
    return super.update(id, dto);
  }
}
