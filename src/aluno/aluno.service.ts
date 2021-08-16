import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { Tipo } from '../usuario/entities/usuario.enum';
import { ParticipantService } from '../voluntario/participant.service';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunoService extends ParticipantService<
  CreateAlunoDto,
  UpdateAlunoDto
>(Aluno, Tipo.ALUNO) {}
