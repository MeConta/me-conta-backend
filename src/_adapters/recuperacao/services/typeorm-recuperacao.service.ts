import { Injectable } from '@nestjs/common';
import {
  IBuscarRecuperacaoService,
  IRemoverRecuperacaoService,
  ISalvarHashRecuperacaoService,
} from '../../../_business/recuperacao/services/recuperacao.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RecuperacaoDbEntity } from '../entidades/recuperacao.db.entity';
import { Repository } from 'typeorm';
import { IHashGenerateRandomString } from '../../../_business/usuarios/services/hash.service';
import { Recuperacao } from '../../../_business/recuperacao/entidades/recuperacao.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class TypeormRecuperacaoService
  implements
    ISalvarHashRecuperacaoService,
    IHashGenerateRandomString,
    IBuscarRecuperacaoService,
    IRemoverRecuperacaoService
{
  constructor(
    @InjectRepository(RecuperacaoDbEntity)
    private readonly repository: Repository<RecuperacaoDbEntity>,
  ) {}

  randomString(size = +process.env.PASSWORD_RECOVERY_TOKEN_LENGTH): string {
    return randomBytes(size).toString('hex');
  }

  async salvar(input: Recuperacao): Promise<void> {
    const entity = this.repository.create(input);
    await this.repository.save(entity);
  }

  findByHash(hash: string): Promise<Recuperacao> {
    return this.repository.findOne({
      where: {
        hash,
      },
    });
  }

  async remover(hash: string): Promise<void> {
    await this.repository.delete({
      hash,
    });
  }
}
