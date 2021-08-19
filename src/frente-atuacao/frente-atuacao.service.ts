import { Injectable } from '@nestjs/common';
import { CreateFrenteAtuacaoDto } from './dto/create-frente-atuacao.dto';
import { UpdateFrenteAtuacaoDto } from './dto/update-frente-atuacao.dto';
import { DefaultService } from '../default.service';
import { FrenteAtuacao } from './entities/frente-atuacao.entity';

@Injectable()
export class FrenteAtuacaoService extends DefaultService(
  FrenteAtuacao,
  CreateFrenteAtuacaoDto,
  UpdateFrenteAtuacaoDto,
) {}
