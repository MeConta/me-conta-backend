import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AtualizarVoluntario } from '../../../_business/voluntarios/casos-de-uso/atualizar-voluntario.feat';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import {
  Auth,
  AuthParam,
} from '../../../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { CamposDeFormacaoError } from '../../../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';
import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

class AtualizarVoluntarioDto {
  @IsOptional()
  @IsBoolean({
    message: '$property deve ser um valor booleano',
  })
  status?: boolean;

  @IsOptional()
  @IsString({ message: '$property deve ser uma url válida!' })
  @IsUrl()
  linkSession?: string;

  @IsOptional()
  bio?: string;
}

@ApiTags('Voluntário')
@Controller('voluntario')
export class AtualizarVoluntarioController {
  constructor(
    @Inject(AtualizarVoluntario)
    private readonly useCase: AtualizarVoluntario,
  ) {}
  @Patch(':id')
  @Auth(
    TipoUsuario.ATENDENTE,
    TipoUsuario.SUPERVISOR,
    TipoUsuario.ADMINISTRADOR,
  )
  @AuthParam()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Voluntário atualizado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Voluntário não encontrado',
  })
  async atualizar(
    @Param('id') id: number,
    @Body() dto: AtualizarVoluntarioDto,
  ): Promise<void> {
    try {
      await this.useCase.execute(id, {
        link: dto.linkSession,
        aprovado: dto.status,
        bio: dto.bio,
      });
    } catch (e) {
      switch (true) {
        case e instanceof VoluntarioNaoEncontradoError:
          throw new NotFoundException(e);
        case e instanceof CamposDeFormacaoError:
          throw new UnprocessableEntityException(e);
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
