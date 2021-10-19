import { Inject, Injectable } from '@nestjs/common';
import {
  ICriarHashRecuperacaoService,
  ISalvarHashRecuperacaoService,
} from '../../../_business/recuperacao/services/recuperacao.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RecuperacaoDbEntity } from '../entidades/recuperacao.db.entity';
import { Repository } from 'typeorm';
import { BcryptHashService } from '../../usuarios/services/bcrypt-hash.service';
import { IHashService } from '../../../_business/usuarios/services/hash.service';
import { Recuperacao } from '../../../_business/recuperacao/entidades/recuperacao.entity';

@Injectable()
export class TypeormRecuperacaoService
  implements ISalvarHashRecuperacaoService, ICriarHashRecuperacaoService
{
  constructor(
    @InjectRepository(RecuperacaoDbEntity)
    private readonly repository: Repository<RecuperacaoDbEntity>,
    @Inject(BcryptHashService)
    private readonly hashService: IHashService,
  ) {}

  async criarHash(): Promise<string> {
    return await this.hashService.hash(
      new Date().toTimeString(),
      await this.hashService.generateSalt(),
    );
  }

  async salvar(input: Recuperacao): Promise<void> {
    const entity = this.repository.create(input);
    await this.repository.save(entity);
  }
}
