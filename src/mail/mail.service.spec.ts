import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { FactoryMock } from '../testing/factory.mock';
import { IContact } from './templates/contact.interface';
import { InternalServerErrorException } from '@nestjs/common';
import { ContactStub } from '../testing/contact.stub';

describe('MailService', () => {
  let service: MailService;
  let mailerService: MailerService;

  const EMAIL = 'teste@teste.com';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MailerService,
          useFactory: FactoryMock.mailerServiceMockFactory,
        },
        MailService,
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('Deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('Deve enviar um e-mail', async () => {
    await service.sendContact(ContactStub.getContactForm(), EMAIL);
    expect(mailerService.sendMail).toBeCalled();
  });

  it('Deve dar erro ao enviar um e-mail', async () => {
    jest
      .spyOn(mailerService, 'sendMail')
      .mockRejectedValue(new InternalServerErrorException());
    await expect(() =>
      service.sendContact(ContactStub.getContactForm(), EMAIL),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
