import { Abordagem, Bio, Voluntario } from '../entidades/voluntario.entity';
import { Usuario } from '../../usuarios/entidades/usuario.entity';

export type VoluntarioOutput = Voluntario & Bio & Abordagem;
export type ObfuscatedVoluntarioOutput = Exclude<
  VoluntarioOutput,
  'aprovado' | 'semestre' | 'anoFormacao' | 'usuario'
> & { usuario: Pick<Usuario, 'id' | 'nome' | 'email' | 'tipo'> };
