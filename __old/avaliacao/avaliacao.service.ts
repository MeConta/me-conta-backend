import { Injectable } from '@nestjs/common';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { DefaultService } from '../../src/default.service';
import { Avaliacao } from './entities/avaliacao.entity';

@Injectable()
export class AvaliacaoService extends DefaultService(
  Avaliacao,
  CreateAvaliacaoDto,
  UpdateAvaliacaoDto,
) {}
