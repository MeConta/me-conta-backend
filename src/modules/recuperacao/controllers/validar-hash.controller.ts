import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  RecuperacaoExpiradaError,
  RecuperacaoNotFoundError,
} from '../../../_business/recuperacao/casos-de-uso/reset-senha.feat';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ValidaHash } from '../../../_business/recuperacao/casos-de-uso/validar-hash.feat';
import { UsuarioDto } from '../../../_adapters/usuarios/dto/usuario.dto';

@ApiTags('Senha')
@Controller('senha/reset')
export class HashController {
  constructor(
    @Inject(ValidaHash)
    private readonly validaHash: ValidaHash,
  ) {}
  @Get(':hash?')
  @ApiNotFoundResponse({
    description: 'Pedido de recuperação de senha inválido',
  })
  @ApiOkResponse({
    isArray: true,
    description: 'Usuário Encontrado',
    type: UsuarioDto,
  })
  async validar(@Param('hash') hash: string): Promise<any> {
    try {
      return await this.validaHash.execute(hash);
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
