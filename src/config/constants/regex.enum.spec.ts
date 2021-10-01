import { Regex } from './index';

describe('Regex enum test', () => {
  describe('Telefone regex test', () => {
    // (11) 91231-6165
    // (11) 1231-6165
    const TELEFONE = new RegExp(Regex.TELEFONE);

    it('Não deve permitir número sem traço', () => {
      expect('(11) 999995555').not.toMatch(TELEFONE);
    });

    it('Não deve permitir número sem ddd', () => {
      expect('99999-5555').not.toMatch(TELEFONE);
    });

    it('Não deve permitir ddd sem parênteses', () => {
      expect('11 99999-5555').not.toMatch(TELEFONE);
    });

    it('Não deve permitir número com menos de 8 dígitos', () => {
      expect('(11) 9999-555').not.toMatch(TELEFONE);
      expect('(11) 999-5555').not.toMatch(TELEFONE);
    });

    it('Deve permitir números válidos', () => {
      expect('(11) 8999-5555').toMatch(TELEFONE);
      expect('(31) 99999-5555').toMatch(TELEFONE);
    });
  });
});
