import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { AuthService } from '../../../_adapters/auth/services/auth.service';
import { LocalAuthGuard } from '../../../_adapters/auth/guards';
import {
  ApiBasicAuth,
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthDto, Login, TokenDto } from '../../../_adapters/auth/dto/auth.dto';
import { User } from '../../../_adapters/auth/decorators/user.decorator';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';
import { JwtRefreshTokenStrategy } from '../../../_adapters/auth/strategies/jwt-refresh-token.strategy';
import { OptionalAuth } from '../../../_adapters/auth/decorators/auth.decorator';

@Controller('auth')
@ApiBasicAuth()
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({
    description: `Usuário ou senha incorretos`,
  })
  @ApiBody({
    type: AuthDto,
  })
  async login(@Request() req: Login): Promise<TokenDto> {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshTokenStrategy)
  @HttpCode(HttpStatus.OK)
  @OptionalAuth()
  async refresh(
    @Request() request: ExpressRequest,
    @User() { id }: Pick<ITokenUser, 'id'>,
  ) {
    const refreshTokenHeader = request
      ?.get('x-refresh-token')
      ?.replace('Bearer', '')
      .trim();

    return this.authService.refreshTokens(refreshTokenHeader, id);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @OptionalAuth()
  async logout(@User() { id }: Pick<ITokenUser, 'id'>) {
    return this.authService.logout(id);
  }
}
