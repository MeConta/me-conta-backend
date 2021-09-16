import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AlunoModule } from '../aluno/aluno.module';
import { SupervisorModule } from '../supervisor/supervisor.module';
import { AtendenteModule } from '../atendente/atendente.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UsuarioModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, AuthService, JwtModule],
})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        JwtModule.register({
          secret: `${process.env.JWT_SECRET}`,
          signOptions: { expiresIn: `${process.env.JWT_TIMEOUT}` },
        }),
        UsuarioModule,
        AlunoModule,
        SupervisorModule,
        AtendenteModule,
      ],
      module: AuthModule,
    };
  }
}
