import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Auth } from './decorators';

@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    type: Date,
  })
  getHello(): Date {
    return new Date();
  }

  // TODO: Remover este endpoint de teste
  @Auth()
  @Get('protected')
  getProtected(): { mensagem: string } {
    return { mensagem: `Apenas usuários logados podem ver essa mensagem` };
  }
}
