import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from '../_adapters/usuarios/dto/create-usuario.dto';
import {
  CadastrarNovoUsuario,
  DuplicatedError,
} from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

@Controller('cadastro-inicial')
export class CadastroInicialController {
  constructor(private cadastrarNovoUsuario: CadastrarNovoUsuario) {}
  @Post()
  async cadastrar(@Body() dto: CreateUsuarioDto) {
    try {
      await this.cadastrarNovoUsuario.execute(dto);
    } catch (e) {
      if (e instanceof DuplicatedError) {
        throw new ConflictException({
          code: 409,
          message: e.message,
        });
      }
    }
  }
}
