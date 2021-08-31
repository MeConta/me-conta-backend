import { Post, Body, Patch, Param } from '@nestjs/common';
import { FrenteAtuacaoService } from './frente-atuacao.service';
import { CreateFrenteAtuacaoDto } from './dto/create-frente-atuacao.dto';
import { UpdateFrenteAtuacaoDto } from './dto/update-frente-atuacao.dto';
import { DefaultController } from '../default.controller';
import { FrenteAtuacao } from './entities/frente-atuacao.entity';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Frentes de Atuação')
export class FrenteAtuacaoController extends DefaultController(
  'frente-atuacao',
  FrenteAtuacao,
  FrenteAtuacaoService,
  CreateFrenteAtuacaoDto,
  UpdateFrenteAtuacaoDto,
) {
  @Post()
  @ApiOkResponse({
    description: `Item Criado com sucesso`,
  })
  create(@Body() dto: CreateFrenteAtuacaoDto): Promise<FrenteAtuacao> {
    return super.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: `Item Atualizado com sucesso`,
  })
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  update(
    @Param('id') id: number,
    @Body() dto: UpdateFrenteAtuacaoDto,
  ): Promise<FrenteAtuacao> {
    return super.update(id, dto);
  }
}
