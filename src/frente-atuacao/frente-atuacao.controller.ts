import { Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { FrenteAtuacaoService } from './frente-atuacao.service';
import { CreateFrenteAtuacaoDto } from './dto/create-frente-atuacao.dto';
import { UpdateFrenteAtuacaoDto } from './dto/update-frente-atuacao.dto';
import { DefaultController } from '../default.controller';
import { FrenteAtuacao } from './entities/frente-atuacao.entity';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Frentes de Atuação')
@UseGuards(JwtAuthGuard)
export class FrenteAtuacaoController extends DefaultController(
  'frente-atuacao',
  FrenteAtuacao,
  FrenteAtuacaoService,
  CreateFrenteAtuacaoDto,
  UpdateFrenteAtuacaoDto,
) {
  @Post()
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  create(@Body() dto: CreateFrenteAtuacaoDto): Promise<FrenteAtuacao> {
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
  update(
    @Param('id') id: number,
    @Body() dto: UpdateFrenteAtuacaoDto,
  ): Promise<FrenteAtuacao> {
    return super.update(id, dto);
  }
}
