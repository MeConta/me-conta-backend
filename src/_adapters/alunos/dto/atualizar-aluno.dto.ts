import { PartialType } from '@nestjs/swagger';
import { CreateAlunoDto } from './create-aluno.dto';

export class AtualizarAlunoDto extends PartialType(CreateAlunoDto) {}
