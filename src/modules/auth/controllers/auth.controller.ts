import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from '../../../_adapters/auth/services/auth.service';
import {
  JwtRefreshGuard,
  LocalAuthGuard,
} from '../../../_adapters/auth/guards';
import {
  ApiBasicAuth,
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthDto, Login, TokenDto } from '../../../_adapters/auth/dto/auth.dto';
import { User } from '../../../_adapters/auth/decorators/user.decorator';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';
import { Auth } from '../../../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

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
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(
    // TODO: Melhorar o tipo desse parâmetro
    @Body() { refreshToken }: Record<string, any>,
    @User() { id }: Pick<ITokenUser, 'id'>,
  ): Promise<TokenDto> {
    console.log(refreshToken);

    return this.authService.refreshTokens(refreshToken, id);
  }

  @Post('logout')
  @Auth(
    TipoUsuario.ATENDENTE,
    TipoUsuario.SUPERVISOR,
    TipoUsuario.ADMINISTRADOR,
    TipoUsuario.ALUNO,
  )
  @HttpCode(HttpStatus.OK)
  async logout(@User() { id }: Pick<ITokenUser, 'id'>) {
    return this.authService.logout(id);
  }
}
