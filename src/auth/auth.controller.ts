import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../_adapters/auth/services/auth.service';
import { LocalAuthGuard } from '../_adapters/auth/guards';
import {
  ApiBasicAuth,
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IAuth, ILogin, IToken } from '../_business/auth/interfaces/auth';

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
    type: IAuth,
  })
  async login(@Request() req: ILogin): Promise<IToken> {
    return this.authService.login(req.user);
  }
}
