import { IPasswordStrengthService } from '../_business/interfaces/password-strength.service';
import * as zxcvbn from 'zxcvbn';
export class ZxcvbnPasswordService implements IPasswordStrengthService {
  getStrength(password: string): number {
    return zxcvbn(password);
  }
}
