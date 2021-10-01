import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeormUsuarioService } from '../_adapters/usuarios/typeorm-usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UsuarioDbEntity]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, TypeormUsuarioService],
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
