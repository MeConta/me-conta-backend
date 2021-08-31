import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Contato')
@Controller('contato')
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
