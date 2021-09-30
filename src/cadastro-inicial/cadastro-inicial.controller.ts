import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUsuarioDto } from '../_adapters/usuarios/dto/create-usuario.dto';
import { TypeormUsuarioService } from '../_adapters/usuarios/typeorm-usuario.service';
import { CadastrarNovoUsuarioService } from '../_business/usuarios/interfaces/cadastrar-novo-usuario.service';

@Controller('cadastro-inicial')
export class CadastroInicialController {
  constructor(
    @Inject(TypeormUsuarioService)
    private readonly service: CadastrarNovoUsuarioService,
  ) {}
  @Post()
  cadastrar(@Body() dto: CreateUsuarioDto) {
    return this.service.cadastrar(dto);
  }
}
