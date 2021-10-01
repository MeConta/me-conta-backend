import { Injectable } from '@nestjs/common';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { VoluntarioService } from '../voluntario/voluntario.service';
import { Tipo } from '../../src/usuario/entities/usuario.enum';
import { Supervisor } from './entities/supervisor.entity';

@Injectable()
export class SupervisorService extends VoluntarioService(
  Supervisor,
  Tipo.SUPERVISOR,
  CreateSupervisorDto,
  UpdateSupervisorDto,
) {}
