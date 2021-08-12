import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtendenteService } from './atendente.service';
import { CreateAtendenteDto } from './dto/create-atendente.dto';
import { UpdateAtendenteDto } from './dto/update-atendente.dto';

@Controller('atendente')
export class AtendenteController {
  constructor(private readonly atendenteService: AtendenteService) {}

  @Post()
  create(@Body() createAtendenteDto: CreateAtendenteDto) {
    return this.atendenteService.create(createAtendenteDto);
  }

  @Get()
  findAll() {
    return this.atendenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atendenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtendenteDto: UpdateAtendenteDto) {
    return this.atendenteService.update(+id, updateAtendenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atendenteService.remove(+id);
  }
}
