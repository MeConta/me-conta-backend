import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAtendenteDto } from './dto/create-atendente.dto';
import { UpdateAtendenteDto } from './dto/update-atendente.dto';
import { Atendente } from './entities/atendente.entity';
import { Tipo } from '../usuario/entities/usuario.enum';
import { VoluntarioService } from '../voluntario/voluntario.service';
import { SupervisorService } from '../supervisor/supervisor.service';
import { Erros } from '../config/constants';
import { Supervisor } from '../supervisor/entities/supervisor.entity';

@Injectable()
export class AtendenteService extends VoluntarioService(
  Atendente,
  Tipo.ATENDENTE,
  CreateAtendenteDto,
  UpdateAtendenteDto,
) {
  @Inject(SupervisorService)
  private readonly supervisorService: SupervisorService;

  async update(id: number, dto: UpdateAtendenteDto): Promise<Atendente> {
    if (dto.supervisor) {
      let supervisor: Supervisor = null;
      if (dto.supervisor.id) {
        try {
          supervisor = await this.supervisorService.findOne(dto.supervisor.id);
        } catch (e) {
          throw new UnprocessableEntityException(
            Erros.SUPERVISOR_NAO_ENCONTRADO,
          );
        }
      }
      dto = {
        ...dto,
        supervisor,
      };
    }
    return super.update(id, dto);
  }
}
