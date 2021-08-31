import { Post, Patch, Body } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { DefaultController } from '../default.controller';
import { Avaliacao } from './entities/avaliacao.entity';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Avaliação')
export class AvaliacaoController extends DefaultController(
  'avaliacao',
  Avaliacao,
  AvaliacaoService,
  CreateAvaliacaoDto,
  UpdateAvaliacaoDto,
) {
  @Post()
  @ApiOkResponse({
    description: `Item Criado com sucesso`,
  })
  create(@Body() dto: CreateAvaliacaoDto): Promise<Avaliacao> {
    return super.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: `Item Atualizado com sucesso`,
  })
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  update(id: number, @Body() dto: UpdateAvaliacaoDto): Promise<Avaliacao> {
    return super.update(id, dto);
  }
}
