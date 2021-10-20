export interface IHashGenerateSaltService {
  generateSalt(): Promise<string>;
}
export interface IHashHashService {
  hash(value: string, salt: string): Promise<string>;
}
export interface IHashCompareService {
  compare(value: string, hashed: string): Promise<boolean>;
}
export interface IHashGenerateRandomString {
  randomString(size?: number): string;
}
