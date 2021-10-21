import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  RecuperacaoExpiradaError,
  RecuperacaoNotFoundError,
  ResetSenha,
} from '../_business/recuperacao/casos-de-uso/reset-senha.feat';
import { ResetSenhaInputDto } from './dto/reset-senha.dto';
import { ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('senha/reset')
export class ResetController {
  constructor(
    @Inject(ResetSenha)
    private readonly resetSenha: ResetSenha,
  ) {}
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNotFoundResponse({
    description: 'Pedido de recuperação de senha não encontrado',
    type: RecuperacaoNotFoundError,
  })
  async reset(@Body() dto: ResetSenhaInputDto): Promise<void> {
    try {
      await this.resetSenha.execute(dto);
    } catch (e) {
      switch (true) {
        case e instanceof RecuperacaoNotFoundError:
          throw new NotFoundException(e);
        case e instanceof RecuperacaoExpiradaError:
          throw new UnprocessableEntityException(e);
      }
    }
  }
}
