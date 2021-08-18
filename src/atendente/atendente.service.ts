import { Injectable } from '@nestjs/common';
import { CreateAtendenteDto } from './dto/create-atendente.dto';
import { UpdateAtendenteDto } from './dto/update-atendente.dto';
import { Atendente } from './entities/atendente.entity';
import { Tipo } from '../usuario/entities/usuario.enum';
import { VoluntarioService } from '../voluntario/voluntario.service';

@Injectable()
export class AtendenteService extends VoluntarioService(
  Atendente,
  Tipo.ATENDENTE,
  CreateAtendenteDto,
  UpdateAtendenteDto,
) {}
