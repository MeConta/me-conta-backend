import { IHashService } from '../../../_business/usuarios/interfaces/hash.service';
import { BcryptHashService } from './bcrypt-hash.service';
import * as bcrypt from 'bcrypt';

describe('Hash Service', () => {
  let service: IHashService;
  jest.mock('bcrypt');
  beforeEach(async () => {
    service = new BcryptHashService();
  });
  beforeEach(async () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => Promise.resolve('hash'));
    jest
      .spyOn(bcrypt, 'genSalt')
      .mockImplementation(() => Promise.resolve('salt'));
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));
  });
  it('Deve ser definido', async () => {
    expect(service).toBeDefined();
  });
  it('Deve chamar o bcrypt para gerar um salt', async () => {
    await service.generateSalt();
    expect(bcrypt.genSalt).toBeCalled();
  });
  it('Deve chamar o bcrypt para gerar uma hash', async () => {
    await service.hash('password', 'salt');
    expect(bcrypt.hash).toBeCalled();
  });
  it('Deve chamar o bcrypt comparar uma hash', async () => {
    await service.compare('password', 'password');
    expect(bcrypt.compare).toBeCalled();
  });
});
