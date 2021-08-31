import { Post, Body, Patch, Param } from '@nestjs/common';
import { AtendenteService } from './atendente.service';
import { CreateAtendenteDto } from './dto/create-atendente.dto';
import { UpdateAtendenteDto } from './dto/update-atendente.dto';
import { DefaultController } from '../default.controller';
import { Atendente } from './entities/atendente.entity';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Atendente')
export class AtendenteController extends DefaultController(
  'atendente',
  Atendente,
  AtendenteService,
  CreateAtendenteDto,
  UpdateAtendenteDto,
) {
  @Post()
  @ApiOkResponse({
    description: `Item Criado com sucesso`,
  })
  create(@Body() dto: CreateAtendenteDto) {
    return super.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: `Item Atualizado com sucesso`,
  })
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  update(@Param('id') id: number, @Body() dto: UpdateAtendenteDto) {
    return super.update(id, dto);
  }
}
