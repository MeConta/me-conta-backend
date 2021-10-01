export interface IHashService {
  generateSalt(): Promise<string>;
  hash(value: string, salt: string): Promise<string>;
  compare(value: string, hashed: string): Promise<boolean>;
}
