import { IContact } from '../mail/templates/contact.interface';

export class ContactStub {
  static getContactForm(): IContact {
    return {
      nome: 'Teste',
      mensagem: 'Mensagem',
      email: 'teste@teste.com',
    };
  }
}
