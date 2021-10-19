import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { RecuperarSenha } from '../_business/recuperacao/casos-de-uso/recuperar-senha.feat';

@Controller('recuperacao')
export class RecuperacaoController {
  constructor(
    @Inject(RecuperarSenha)
    private readonly recuperarSenha: RecuperarSenha,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async recuperar(@Body() input: { email: string }): Promise<void> {
    try {
      return await this.recuperarSenha.execute(input.email);
    } catch (e) {
      console.error(e);
      return Promise.resolve();
    }
  }
}
