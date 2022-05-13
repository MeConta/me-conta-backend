import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { RecuperarSenha } from '../../../_business/recuperacao/casos-de-uso/recuperar-senha.feat';
import { RecuperacaoDto } from '../../../_adapters/recuperacao/dto/recuperacao.dto';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioNaoEncontradoError } from '../../../_business/usuarios/erros/usuarios.errors';
import { EMailSendError } from '../../../_business/mail/services/mail.service';

@ApiTags('Senha')
@Controller('senha/recuperacao')
export class RecuperacaoController {
  constructor(
    @Inject(RecuperarSenha)
    private readonly recuperarSenha: RecuperarSenha,
  ) {}

  @ApiInternalServerErrorResponse({
    description: 'Erro genérico',
  })
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async recuperar(@Body() input: RecuperacaoDto): Promise<void> {
    const { email } = input;
    try {
      return await this.recuperarSenha.execute(email);
    } catch (e) {
      if (e instanceof UsuarioNaoEncontradoError) {
        throw new NotFoundException(e);
      }
      if (e instanceof EMailSendError) {
        throw new InternalServerErrorException(e);
      }
    }
  }
}
