import { Body } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { DefaultController } from '../default.controller';
import { Avaliacao } from './entities/avaliacao.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth, PatchApi, PostApi } from '../decorators';

@ApiTags('Avaliação')
export class AvaliacaoController extends DefaultController(
  'avaliacao',
  Avaliacao,
  AvaliacaoService,
  CreateAvaliacaoDto,
  UpdateAvaliacaoDto,
) {
  @PostApi()
  @Auth()
  create(@Body() dto: CreateAvaliacaoDto): Promise<Avaliacao> {
    return super.create(dto);
  }

  @PatchApi()
  @Auth()
  update(id: number, @Body() dto: UpdateAvaliacaoDto): Promise<Avaliacao> {
    return super.update(id, dto);
  }
}
