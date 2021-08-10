import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { usuarioProviders } from '../providers/usuario.provider';
import { UsuarioService } from '../services/usuario.service';

@Module({
  imports: [DatabaseModule],
  providers: [...usuarioProviders, UsuarioService],
})
export class UsuarioModule {}