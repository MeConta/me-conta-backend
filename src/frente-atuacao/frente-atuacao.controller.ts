import { Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { FrenteAtuacaoService } from './frente-atuacao.service';
import { CreateFrenteAtuacaoDto } from './dto/create-frente-atuacao.dto';
import { UpdateFrenteAtuacaoDto } from './dto/update-frente-atuacao.dto';
import { DefaultController } from '../default.controller';
import { FrenteAtuacao } from './entities/frente-atuacao.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TOKEN_NAME } from '../config/swagger.config';

@ApiTags('Frentes de Atuação')
export class FrenteAtuacaoController extends DefaultController(
  'frente-atuacao',
  FrenteAtuacao,
  FrenteAtuacaoService,
  CreateFrenteAtuacaoDto,
  UpdateFrenteAtuacaoDto,
) {
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
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
  @UseGuards(JwtAuthGuard)
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
