import { Inject, Injectable } from '@nestjs/common';
import { CreateContatoDto } from './dto/create-contato.dto';
import { MailService } from '../mail/mail.service';
import { Emails } from '../../src/config/constants';

@Injectable()
export class ContatoService {
  constructor(
    @Inject(MailService)
    private readonly mailService: MailService,
  ) {}
  send(dto: CreateContatoDto) {
    return this.mailService.sendEmail(Emails.CONTATO, dto);
  }
}
