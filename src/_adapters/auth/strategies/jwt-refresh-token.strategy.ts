import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

import { TokenPayload, TokenUser } from '../dto/auth.dto';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: true,
      secretOrKey: `${process.env.JWT_REFRESH_SECRET}`,
      passReqToCallback: true,
    });
  }

  async validate(payload: TokenPayload): Promise<TokenUser> {
    return {
      email: payload.email,
      id: payload.sub,
      roles: payload.roles,
    };
  }
}
