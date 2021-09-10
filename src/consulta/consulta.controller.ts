import { Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { DefaultController } from '../default.controller';
import { Consulta } from './entities/consulta.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TOKEN_NAME } from '../config/swagger.config';

@ApiTags('Consulta')
export class ConsultaController extends DefaultController(
  'consulta',
  Consulta,
  ConsultaService,
  CreateConsultaDto,
  UpdateConsultaDto,
) {
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  create(@Body() dto: CreateConsultaDto): Promise<Consulta> {
    return super.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  update(
    @Param('id') id: number,
    @Body() dto: UpdateConsultaDto,
  ): Promise<Consulta> {
    return super.update(id, dto);
  }
}
