import { Module } from '@nestjs/common';
import { AtendenteService } from './atendente.service';
import { AtendenteController } from './atendente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atendente } from './entities/atendente.entity';
import { VoluntarioModule } from '../voluntario/voluntario.module';

@Module({
  imports: [VoluntarioModule, TypeOrmModule.forFeature([Atendente])],
  controllers: [AtendenteController],
  providers: [AtendenteService],
})
export class AtendenteModule {}
