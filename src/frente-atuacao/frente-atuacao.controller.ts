import { Post, Body, Patch, Param } from '@nestjs/common';
import { FrenteAtuacaoService } from './frente-atuacao.service';
import { CreateFrenteAtuacaoDto } from './dto/create-frente-atuacao.dto';
import { UpdateFrenteAtuacaoDto } from './dto/update-frente-atuacao.dto';
import { DefaultController } from '../default.controller';
import { FrenteAtuacao } from './entities/frente-atuacao.entity';

export class FrenteAtuacaoController extends DefaultController(
  'frente-atuacao',
  FrenteAtuacao,
  FrenteAtuacaoService,
  CreateFrenteAtuacaoDto,
  UpdateFrenteAtuacaoDto,
) {
  @Post()
  create(@Body() dto: CreateFrenteAtuacaoDto): Promise<FrenteAtuacao> {
    return super.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFrenteAtuacaoDto,
  ): Promise<FrenteAtuacao> {
    return super.update(id, dto);
  }
}
