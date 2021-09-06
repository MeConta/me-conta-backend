import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Contato')
@Controller('contato')
@UseGuards(JwtAuthGuard)
export class ContatoController {
  constructor(
    @Inject(ContatoService)
    private readonly contatoService: ContatoService,
  ) {}

  @Post()
  @ApiNoContentResponse({
    description: `Mensagem enviada com sucesso`,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() createContatoDto: CreateContatoDto) {
    return this.contatoService.send(createContatoDto);
  }
}
