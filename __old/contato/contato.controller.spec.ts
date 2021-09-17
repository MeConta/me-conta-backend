import { Test, TestingModule } from '@nestjs/testing';
import { ContatoController } from './contato.controller';
import { ContatoService } from './contato.service';
import { FactoryMock } from '../../src/testing/factory.mock';
import { ContactStub } from '../testing/contact.stub';

describe('ContatoController', () => {
  let controller: ContatoController;
  let service: ContatoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContatoController],
      providers: [
        {
          provide: ContatoService,
          useFactory: FactoryMock.contatoServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<ContatoController>(ContatoController);
    service = module.get<ContatoService>(ContatoService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve enviar um contato', async () => {
    await controller.create(ContactStub.getContactForm());
    expect(service.send).toBeCalled();
  });
});
