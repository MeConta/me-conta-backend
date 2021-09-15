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

  private static checkFormacao(
    dto: CreateAtendenteDto | UpdateAtendenteDto,
  ): CreateAtendenteDto | UpdateAtendenteDto {
    if (dto.formado === true) {
      dto.semestre = null;
    }

    if (dto.formado === false) {
      dto.anoConclusao = null;
      dto.especializacao = null;
      dto.crp = null;
    }
    return dto;
  }

  async create(dto: CreateAtendenteDto): Promise<Atendente> {
    dto = AtendenteService.checkFormacao(dto) as CreateAtendenteDto;
    return super.create(dto);
  }

  async update(id: number, dto: UpdateAtendenteDto): Promise<Atendente> {
    dto = await this.checkSupervisor(dto);

    dto = AtendenteService.checkFormacao(dto) as UpdateAtendenteDto;

    return super.update(id, dto);
  }

  async updateSelf(dto: UpdateAtendenteDto, user: any): Promise<Atendente> {
    dto = await this.checkSupervisor(dto);

    dto = AtendenteService.checkFormacao(dto) as UpdateAtendenteDto;

    return super.update(user.id, dto);
  }

  private async checkSupervisor(
    dto: UpdateAtendenteDto,
  ): Promise<UpdateAtendenteDto> {
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

    return dto;
  }
}
