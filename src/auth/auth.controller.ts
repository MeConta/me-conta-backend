import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import {
  ApiBasicAuth,
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthDto, LoginDto, TokenDto } from './dto';

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
  async login(@Request() req: LoginDto): Promise<TokenDto> {
    return this.authService.login(req.user);
  }
}
