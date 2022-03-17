import { JwtSignOptions } from '@nestjs/jwt';

export interface IJwtService {
  sign(payload: any, options?: JwtSignOptions): string;
}
