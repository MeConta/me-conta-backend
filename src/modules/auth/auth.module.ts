import { DynamicModule, Module } from '@nestjs/common';
import {
  AuthService,
  NestAuthService,
  NestLoginService,
} from '../../_adapters/auth/services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../_adapters/auth/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from '../../_adapters/auth/strategies/jwt.strategy';
import { TypeormUsuarioService } from '../../_adapters/usuarios/services/typeorm-usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDbEntity } from '../../_adapters/usuarios/entidades/usuario.db.entity';
import { BcryptHashService } from '../../_adapters/usuarios/services/bcrypt-hash.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UsuarioDbEntity]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    NestAuthService,
    NestLoginService,
    TypeormUsuarioService,
    BcryptHashService,
  ],
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
      ],
      module: AuthModule,
    };
  }
}