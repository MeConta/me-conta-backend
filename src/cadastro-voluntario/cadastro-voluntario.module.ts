import { Inject, Injectable, Module } from '@nestjs/common';
import {
  CadastrarVoluntario,
  ICadastrarNovoVoluntarioService,
  NovoVoluntario,
} from '../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';
import { IBuscarUsuarioViaId } from '../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';
import { TypeormUsuarioService } from '../_adapters/usuarios/typeorm-usuario.service';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { VoluntarioDbEntity } from '../_adapters/voluntarios/entidades/voluntario-db.entity';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';
import { CadastroVoluntarioController } from './cadastro-voluntario.controller';
import { Repository } from 'typeorm';

@Injectable()
export class TypeormVoluntarioService
  implements ICadastrarNovoVoluntarioService
{
  constructor(
    @InjectRepository(VoluntarioDbEntity)
    private readonly repository: Repository<VoluntarioDbEntity>,
  ) {}
  async cadastrar(voluntario: NovoVoluntario): Promise<void> {
    const entity = this.repository.create(voluntario);
    await this.repository.save(entity);
  }
}

@Injectable()
class NestCadastrarVoluntario extends CadastrarVoluntario {
  constructor(
    @Inject(TypeormUsuarioService)
    usuarioService: IBuscarUsuarioViaId,
    @Inject(TypeormVoluntarioService)
    voluntarioService: ICadastrarNovoVoluntarioService,
  ) {
    super(voluntarioService, usuarioService);
  }
}
@Module({
  imports: [TypeOrmModule.forFeature([UsuarioDbEntity, VoluntarioDbEntity])],
  providers: [
    TypeormUsuarioService,
    TypeormVoluntarioService,
    {
      provide: CadastrarVoluntario,
      useClass: NestCadastrarVoluntario,
    },
  ],
  controllers: [CadastroVoluntarioController],
})
export class CadastroVoluntarioModule {}
