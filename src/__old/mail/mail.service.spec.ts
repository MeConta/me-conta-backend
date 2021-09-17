import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { FactoryMock } from '../testing/factory.mock';
import { InternalServerErrorException } from '@nestjs/common';
import { ContactStub } from '../testing/contact.stub';
import { Emails } from '../../config/constants';

describe('MailService', () => {
  let service: MailService;
  let mailerService: MailerService;

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
    await service.sendEmail(Emails.CONTATO, ContactStub.getContactForm());
    expect(mailerService.sendMail).toBeCalled();
  });

  it('Deve dar erro ao enviar um e-mail', async () => {
    jest
      .spyOn(mailerService, 'sendMail')
      .mockRejectedValue(new InternalServerErrorException());
    await expect(() =>
      service.sendEmail(Emails.CONTATO, ContactStub.getContactForm()),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
