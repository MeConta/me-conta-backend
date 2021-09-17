import { Inject, Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { DefaultService } from '../../default.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { Tipo } from '../../usuario/entities/usuario.enum';
import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';

@Injectable()
export class AlunoService extends DefaultService(
  Aluno,
  CreateAlunoDto,
  UpdateAlunoDto,
) {
  @Inject(UsuarioService) usuarioService: UsuarioService;

  async create(dto: CreateAlunoDto): Promise<Aluno> {
    const usuarioDto = {
      ...dto,
      tipoUsuario: Tipo.ALUNO,
    } as CreateUsuarioDto;
    const usuario = await this.usuarioService.create(usuarioDto);
    return super.create({
      ...dto,
      usuario,
    });
  }

  async update(id: number, dto: UpdateAlunoDto): Promise<Aluno> {
    const entity = await this.findOne(id);

    await this.usuarioService.update(entity.usuario.id, dto);
    return super.update(id, dto);
  }

  async findByUserId(userId: number): Promise<Aluno> {
    return this.repository.findOne({
      where: {
        usuario: {
          id: userId,
        },
      },
    });
  }
}
