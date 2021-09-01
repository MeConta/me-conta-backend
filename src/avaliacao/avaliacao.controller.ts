import { Post, Patch, Body } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { DefaultController } from '../default.controller';
import { Avaliacao } from './entities/avaliacao.entity';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Avaliação')
export class AvaliacaoController extends DefaultController(
  'avaliacao',
  Avaliacao,
  AvaliacaoService,
  CreateAvaliacaoDto,
  UpdateAvaliacaoDto,
) {
  @Post()
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  create(@Body() dto: CreateAvaliacaoDto): Promise<Avaliacao> {
    return super.create(dto);
  }

  @Patch(':id')
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  update(id: number, @Body() dto: UpdateAvaliacaoDto): Promise<Avaliacao> {
    return super.update(id, dto);
  }
}
