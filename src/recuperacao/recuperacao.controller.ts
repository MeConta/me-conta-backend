import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { RecuperarSenha } from '../_business/recuperacao/casos-de-uso/recuperar-senha.feat';
import { RecuperacaoDto } from '../_adapters/recuperacao/recuperacao.dto';

@Controller('recuperacao')
export class RecuperacaoController {
  constructor(
    @Inject(RecuperarSenha)
    private readonly recuperarSenha: RecuperarSenha,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async recuperar(@Body() input: RecuperacaoDto): Promise<void> {
    const { email } = input;
    try {
      return await this.recuperarSenha.execute(email);
    } catch (e) {
      // TODO: Log de erro
      // console.error(e);
      return Promise.resolve();
    }
  }
}