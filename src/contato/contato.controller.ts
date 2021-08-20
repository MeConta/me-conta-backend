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

@Controller('contato')
export class ContatoController {
  constructor(
    @Inject(ContatoService)
    private readonly contatoService: ContatoService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() createContatoDto: CreateContatoDto) {
    return this.contatoService.send(createContatoDto);
  }
}
