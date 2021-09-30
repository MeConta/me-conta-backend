export interface IPasswordStrengthService {
  getStrength(password: string): number;
}
