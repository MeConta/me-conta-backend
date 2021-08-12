import { Injectable } from '@nestjs/common';
import { CreateAtendenteDto } from './dto/create-atendente.dto';
import { UpdateAtendenteDto } from './dto/update-atendente.dto';

@Injectable()
export class AtendenteService {
  create(createAtendenteDto: CreateAtendenteDto) {
    return 'This action adds a new atendente';
  }

  findAll() {
    return `This action returns all atendente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} atendente`;
  }

  update(id: number, updateAtendenteDto: UpdateAtendenteDto) {
    return `This action updates a #${id} atendente`;
  }

  remove(id: number) {
    return `This action removes a #${id} atendente`;
  }
}
