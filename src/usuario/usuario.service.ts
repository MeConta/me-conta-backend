import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { EntityColumnNotFound, Repository } from 'typeorm';
import { Erros } from '../erros.enum';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private repository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.repository.create(createUsuarioDto);
    try {
      return await this.repository.save(usuario);
    } catch (e) {
      throw new UnprocessableEntityException(Erros.EMAIL_DUPLICADO);
    }
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const usuario = await this.repository.findOne({
      id,
    });
    if (!usuario) {
      throw new NotFoundException(Erros.NAO_ENCONTRADO);
    }
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const result = await this.repository.update(
        {
          id,
        },
        updateUsuarioDto,
      );
      if (!result.affected) {
        return Promise.reject(new NotFoundException(Erros.NAO_ENCONTRADO));
      }
      return await this.findOne(id);
    } catch (e) {
      throw new UnprocessableEntityException(Erros.PARAMETROS_INCORRETOS);
    }
  }

  async remove(id: number) {
    return this.repository.softRemove([await this.findOne(id)]);
  }
}
