import { Inject, Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuario/entities/usuario.entity';
import { TokenDto, TokenPayload } from './dto';
import { AtendenteService } from '../atendente/atendente.service';
import { AlunoService } from '../aluno/aluno.service';
import { Tipo } from '../usuario/entities/usuario.enum';
import { SupervisorService } from '../supervisor/supervisor.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsuarioService)
    private usuarioService: UsuarioService,

    @Inject(AtendenteService)
    private atendenteService: AtendenteService,

    @Inject(AlunoService)
    private alunoService: AlunoService,

    @Inject(SupervisorService)
    private supervisorService: SupervisorService,

    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Usuario> {
    const usuario = await this.usuarioService.findOneByEmail(email);

    if (!usuario || usuario.senha !== (await bcrypt.hash(pass, usuario.salt))) {
      return null;
    }

    switch (usuario.tipoUsuario) {
      case Tipo.ALUNO:
        const aluno = await this.alunoService.findByUserId(usuario.id);
        break;
      case Tipo.ATENDENTE:
        // const atendente = await this.atendenteService.findByUserId(usuario.id);
        break;
      case Tipo.SUPERVISOR:
        /* const supervisor = await this.supervisorService.findByUserId(
          usuario.id,
        ); */
        break;
      default:
    }

    return usuario;
  }

  login(user: Usuario): TokenDto {
    const payload: TokenPayload = {
      email: user.email,
      sub: user.id,
      roles: [user.tipoUsuario],
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
