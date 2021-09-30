import { IHashService } from '../_business/interfaces/hash.service';
import { IPasswordStrengthService } from '../_business/interfaces/password-strength.service';
import * as bcrypt from 'bcrypt';
import * as zxcvbn from 'zxcvbn';

export class PasswordService implements IHashService, IPasswordStrengthService {
  async generateSalt(): Promise<string> {
    return bcrypt.genSalt();
  }

  async hash(value: string, salt: string): Promise<string> {
    return bcrypt.hash(value, salt);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
  getStrength(password: string): number {
    return zxcvbn(password);
  }
}
