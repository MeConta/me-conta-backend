import {
  IHashCompareService,
  IHashGenerateSaltService,
  IHashHashService,
} from '../../../_business/usuarios/services/hash.service';
import * as bcrypt from 'bcrypt';

export class BcryptHashService
  implements IHashGenerateSaltService, IHashHashService, IHashCompareService
{
  async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }

  async hash(value: string, salt: string): Promise<string> {
    return await bcrypt.hash(value, salt);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(value, hashed);
  }
}
