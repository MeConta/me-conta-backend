import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
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

  // @Post('refresh')
  // @UseGuards(JwtRefreshTokenStrategy)
  // @HttpCode(HttpStatus.OK)
  // async refresh(@User() user: Usuario) {
  //   return this.authService.logout(id);
  // }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@User() { id }: Pick<ITokenUser, 'id'>) {
    return this.authService.logout(id);
  }
}
