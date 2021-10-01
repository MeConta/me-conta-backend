import { Test, TestingModule } from '@nestjs/testing';
import { ContatoService } from './contato.service';
import { MailService } from '../mail/mail.service';
import { FactoryMock } from '../../src/testing/factory.mock';
import { ContactStub } from '../testing/contact.stub';

describe('ContatoService', () => {
  let service: ContatoService;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MailService,
          useFactory: FactoryMock.mailServiceMockFactory,
        },
        ContatoService,
      ],
    }).compile();

    service = module.get<ContatoService>(ContatoService);
    mailService = module.get<MailService>(MailService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve enviar e-mail', () => {
    service.send(ContactStub.getContactForm());
    expect(mailService.sendEmail).toBeCalled();
  });
});
