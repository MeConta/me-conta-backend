import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FrenteAtuacaoService } from './frente-atuacao.service';
import { CreateFrenteAtuacaoDto } from './dto/create-frente-atuacao.dto';
import { UpdateFrenteAtuacaoDto } from './dto/update-frente-atuacao.dto';

@Controller('frente-atuacao')
export class FrenteAtuacaoController {
  constructor(private readonly frenteAtuacaoService: FrenteAtuacaoService) {}

  @Post()
  create(@Body() createFrenteAtuacaoDto: CreateFrenteAtuacaoDto) {
    return this.frenteAtuacaoService.create(createFrenteAtuacaoDto);
  }

  @Get()
  findAll() {
    return this.frenteAtuacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frenteAtuacaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrenteAtuacaoDto: UpdateFrenteAtuacaoDto) {
    return this.frenteAtuacaoService.update(+id, updateFrenteAtuacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frenteAtuacaoService.remove(+id);
  }
}
