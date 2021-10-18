import { Regex } from './index';

describe('Regex enum test', () => {
  const TELEFONE = new RegExp(Regex.TELEFONE);
  describe('Telefone regex test', () => {
    it('Deve permitir DDD + 8 dígitos', () => {
      expect('1112345678').toMatch(TELEFONE);
    });

    it('Deve permitir DDD + 9 dígitos', () => {
      expect('11912345678').toMatch(TELEFONE);
    });
  });
});
