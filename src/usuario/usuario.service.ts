import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { DefaultService } from '../default.service';
import { Erros } from '../config/constants';
import * as bcrypt from 'bcrypt';
import { Tipo } from './entities/usuario.enum';

@Injectable()
export class UsuarioService extends DefaultService(
  Usuario,
  CreateUsuarioDto,
  UpdateUsuarioDto,
) {
  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const salt = await bcrypt.genSalt();
    dto.senha = await bcrypt.hash(dto.senha, salt);
    try {
      return await super.create({ ...dto, salt });
    } catch (e) {
      throw new UnprocessableEntityException(Erros.EMAIL_DUPLICADO);
    }
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await super.findOne(id);
    if (dto.senha) {
      dto.senha = await bcrypt.hash(dto.senha, usuario.salt);
    }
    try {
      return await this.repository.save(this.repository.create({ ...dto, id }));
    } catch (e) {
      throw new UnprocessableEntityException(Erros.PARAMETROS_INCORRETOS);
    }
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    return this.repository.findOne({ where: { email: email } });
  }

  extractUserDto<
    CreateDto extends CreateUsuarioDto,
    UpdateDto extends UpdateUsuarioDto,
  >(dto: CreateDto | UpdateDto, tipo: Tipo) {
    const {
      email,
      genero,
      cidade,
      UF,
      nome,
      senha,
      dataNascimento,
      telefone,
      ...outrasInformacoes
    } = dto;

    const userDto = {
      email,
      genero,
      cidade,
      UF,
      nome,
      senha,
      dataNascimento,
      telefone,
      tipoUsuario: tipo,
    };
    return { userDto, outrasInformacoes };
  }
}
