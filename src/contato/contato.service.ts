import { Inject, Injectable } from '@nestjs/common';
import { CreateContatoDto } from './dto/create-contato.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ContatoService {
  constructor(
    @Inject(MailService)
    private readonly mailService: MailService,
  ) {}
  send(createContatoDto: CreateContatoDto) {
    return this.mailService.sendContact(createContatoDto);
  }
}
