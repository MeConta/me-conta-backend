import { Body, Inject, Param } from '@nestjs/common';
import { AtendenteService } from './atendente.service';
import { CreateAtendenteDto } from './dto/create-atendente.dto';
import { UpdateAtendenteDto } from './dto/update-atendente.dto';
import { DefaultController } from '../../src/default.controller';
import { Atendente } from './entities/atendente.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth, PatchApi, PostApi } from '../../src/decorators';
import { Tipo } from '../../src/usuario/entities/usuario.enum';
import { User } from '../../src/decorators/user.decorator';
import { TokenUser } from '../../src/auth/dto';

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
    @User() user?: TokenUser,
  ): Promise<Atendente> {
    // TODO: feat(#5): regra de negócio em relação ao usuário logado e edição
    console.log('INFERNO!', user);
    /*
    if (!user.roles.includes(Tipo.ADMINISTRADOR) && user.id != id) {
      throw new ForbiddenException();
    }*/
    return super.update(id, dto);
  }

  @PatchApi()
  @Auth(Tipo.ATENDENTE)
  updateSelf(
    @Body() dto: UpdateAtendenteDto,
    @User() user?,
  ): Promise<Atendente> {
    // TODO: feat(#5): regra de negócio em relação ao usuário logado e edição
    console.log('USER', user);
    return this.service.updateSelf(dto, user);
  }
}
