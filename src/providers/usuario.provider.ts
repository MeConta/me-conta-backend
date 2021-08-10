import { Connection, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { DATABASE_CONNECTION, USUARIO_REPOSITORY } from '../constants';

export const usuarioProviders = [
  {
    provide: USUARIO_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Usuario),
    inject: [DATABASE_CONNECTION],
  },
];
