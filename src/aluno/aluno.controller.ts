import { Body, Controller, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  async create(@Body() dto: CreateAlunoDto) {
    return this.alunoService.create(dto);
  }
}
