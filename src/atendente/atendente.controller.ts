import { Body, Inject, Param } from '@nestjs/common';
import { AtendenteService } from './atendente.service';
import { CreateAtendenteDto } from './dto/create-atendente.dto';
import { UpdateAtendenteDto } from './dto/update-atendente.dto';
import { DefaultController } from '../default.controller';
import { Atendente } from './entities/atendente.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth, PatchApi, PostApi } from '../decorators';
import { Tipo } from '../usuario/entities/usuario.enum';
import { User } from '../decorators/user.decorator';

@ApiTags('Atendente')
export class AtendenteController extends DefaultController(
  'atendente',
  Atendente,
  AtendenteService,
  CreateAtendenteDto,
  UpdateAtendenteDto,
) {
  @Inject(AtendenteService) service: AtendenteService;

  @PostApi()
  create(@Body() dto: CreateAtendenteDto): Promise<Atendente> {
    return super.create(dto);
  }

  @PatchApi()
  @Auth(Tipo.ADMINISTRADOR, Tipo.ATENDENTE)
  update(
    @Param('id') id: number,
    @Body() dto: UpdateAtendenteDto,
    @User() user?,
  ): Promise<Atendente> {
    // TODO: feat(#5): regra de negócio em relação ao usuário logado e edição
    console.log('USER', user);
    return super.update(id, dto);
  }
}
