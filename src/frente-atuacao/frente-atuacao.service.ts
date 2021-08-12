import { Injectable } from '@nestjs/common';
import { CreateFrenteAtuacaoDto } from './dto/create-frente-atuacao.dto';
import { UpdateFrenteAtuacaoDto } from './dto/update-frente-atuacao.dto';

@Injectable()
export class FrenteAtuacaoService {
  create(createFrenteAtuacaoDto: CreateFrenteAtuacaoDto) {
    return 'This action adds a new frenteAtuacao';
  }

  findAll() {
    return `This action returns all frenteAtuacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} frenteAtuacao`;
  }

  update(id: number, updateFrenteAtuacaoDto: UpdateFrenteAtuacaoDto) {
    return `This action updates a #${id} frenteAtuacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} frenteAtuacao`;
  }
}
