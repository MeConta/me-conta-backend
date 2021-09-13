import { Body, Param, UseGuards } from '@nestjs/common';
import { AtendenteService } from './atendente.service';
import { CreateAtendenteDto } from './dto/create-atendente.dto';
import { UpdateAtendenteDto } from './dto/update-atendente.dto';
import { DefaultController } from '../default.controller';
import { Atendente } from './entities/atendente.entity';
import { ApiTags } from '@nestjs/swagger';
import { PatchApi, PostApi, Roles } from '../decorators';
import { Auth } from '../decorators';
import { Tipo } from '../usuario/entities/usuario.enum';
import { RolesGuard } from '../auth/guards';

@ApiTags('Atendente')
export class AtendenteController extends DefaultController(
  'atendente',
  Atendente,
  AtendenteService,
  CreateAtendenteDto,
  UpdateAtendenteDto,
) {
  @PostApi()
  create(@Body() dto: CreateAtendenteDto): Promise<Atendente> {
    return super.create(dto);
  }

  @PatchApi()
  @Auth()
  @Roles(Tipo.ADMINISTRADOR)
  @UseGuards(RolesGuard)
  update(
    @Param('id') id: number,
    @Body() dto: UpdateAtendenteDto,
  ): Promise<Atendente> {
    return super.update(id, dto);
  }
}
