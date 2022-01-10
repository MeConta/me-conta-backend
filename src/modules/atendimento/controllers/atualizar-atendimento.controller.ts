import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  AtendimentoNaoEncontradoError,
  AtualizarAtendimento,
} from '../../../_business/atendimentos/casos-de-uso/atualizar-atendimento.feat';
import { AtualizarAtendimentoDto } from '../../../_adapters/atendimentos/dto/atualizar-atendimento.dto';

@ApiTags('Atendimento')
@Controller('/atendimento')
export class AtualizarAtendimentoController {
  constructor(
    @Inject(AtualizarAtendimento)
    private readonly atualizarAtendimento: AtualizarAtendimento,
  ) {}

  @Patch(':id')
  //@Auth(TipoUsuario.ATENDENTE)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Atendimento atualizado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Atendimento não encontrado',
  })
  async atualizar(
    @Param('id', ParseIntPipe) id,
    @Body() dto: AtualizarAtendimentoDto,
  ): Promise<void> {
    try {
      await this.atualizarAtendimento.execute(id, dto.status);
    } catch (e) {
      switch (true) {
        case e instanceof AtendimentoNaoEncontradoError:
          throw new NotFoundException(e);
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
