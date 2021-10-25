import { Module } from '@nestjs/common';
import { AdminVoluntarioModule } from './voluntario/admin-voluntario.module';

@Module({
  imports: [AdminVoluntarioModule],
})
export class AdminModule {}
