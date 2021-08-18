import { Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consulta])],
  controllers: [ConsultaController],
  providers: [ConsultaService],
})
export class ConsultaModule {}
