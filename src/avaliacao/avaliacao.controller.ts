import { Post, Patch, Body } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { DefaultController } from '../default.controller';
import { Avaliacao } from './entities/avaliacao.entity';

export class AvaliacaoController extends DefaultController(
  'avaliacao',
  Avaliacao,
  AvaliacaoService,
  CreateAvaliacaoDto,
  UpdateAvaliacaoDto,
) {
  @Post()
  create(@Body() dto: CreateAvaliacaoDto): Promise<Avaliacao> {
    return super.create(dto);
  }

  @Patch(':id')
  update(id: string, @Body() dto: UpdateAvaliacaoDto): Promise<Avaliacao> {
    return super.update(id, dto);
  }
}
