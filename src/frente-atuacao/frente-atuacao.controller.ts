import { Body, Param } from '@nestjs/common';
import { FrenteAtuacaoService } from './frente-atuacao.service';
import { CreateFrenteAtuacaoDto } from './dto/create-frente-atuacao.dto';
import { UpdateFrenteAtuacaoDto } from './dto/update-frente-atuacao.dto';
import { DefaultController } from '../default.controller';
import { FrenteAtuacao } from './entities/frente-atuacao.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth, PatchApi, PostApi } from '../decorators';

@ApiTags('Frentes de Atuação')
export class FrenteAtuacaoController extends DefaultController(
  'frente-atuacao',
  FrenteAtuacao,
  FrenteAtuacaoService,
  CreateFrenteAtuacaoDto,
  UpdateFrenteAtuacaoDto,
) {
  @PostApi()
  @Auth()
  create(@Body() dto: CreateFrenteAtuacaoDto): Promise<FrenteAtuacao> {
    return super.create(dto);
  }

  @PatchApi()
  @Auth()
  update(
    @Param('id') id: number,
    @Body() dto: UpdateFrenteAtuacaoDto,
  ): Promise<FrenteAtuacao> {
    return super.update(id, dto);
  }
}
