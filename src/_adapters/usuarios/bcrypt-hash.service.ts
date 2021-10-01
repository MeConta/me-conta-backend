import { IHashService } from '../../_business/usuarios/interfaces/hash.service';
import * as bcrypt from 'bcrypt';

export class BcryptHashService implements IHashService {
  async generateSalt(): Promise<string> {
    return bcrypt.genSalt();
  }

  async hash(value: string, salt: string): Promise<string> {
    return bcrypt.hash(value, salt);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
}
