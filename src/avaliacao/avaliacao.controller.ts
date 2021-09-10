import { Post, Patch, Body, UseGuards } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { DefaultController } from '../default.controller';
import { Avaliacao } from './entities/avaliacao.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TOKEN_NAME } from '../config/swagger.config';

@ApiTags('Avaliação')
export class AvaliacaoController extends DefaultController(
  'avaliacao',
  Avaliacao,
  AvaliacaoService,
  CreateAvaliacaoDto,
  UpdateAvaliacaoDto,
) {
  @Post()
  @ApiBearerAuth(TOKEN_NAME)
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
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
