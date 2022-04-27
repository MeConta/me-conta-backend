import { Test, TestingModule } from '@nestjs/testing';
import {
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  AutorizarVoluntario,
  VoluntarioNaoEncontradoError,
} from '../../../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import { createMock } from '@golevelup/ts-jest';
import { AutorizarVoluntarioInputDto } from '../../dto/autorizar-voluntario.dto';
import { AutorizarVoluntarioController } from './autorizar-voluntario.controller';
import { EMailSendError } from '../../../../../_business/mail/services/mail.service';

describe('Aprovação de Voluntários', () => {
  let controller: AutorizarVoluntarioController;
  let useCase: AutorizarVoluntario;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AutorizarVoluntario,
          useValue: createMock<AutorizarVoluntario>(),
        },
      ],
      controllers: [AutorizarVoluntarioController],
    }).compile();
    controller = module.get<AutorizarVoluntarioController>(
      AutorizarVoluntarioController,
    );
    useCase = module.get<AutorizarVoluntario>(AutorizarVoluntario);
  });
  it('Deve ser Definido', async () => {
    expect(controller).toBeDefined();
  });
  it('Deve aprovar um voluntário', async () => {
    await controller.aprovar(1, {
      aprovado: true,
      link: 'meet.google.com/acs-cbso-yfy',
    });
    expect(useCase.execute).toBeCalledWith(
      expect.any(Number),
      expect.any(Object),
    );
  });
  it('Deve dar erro de voluntário não encontrado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new VoluntarioNaoEncontradoError());
    await expect(() =>
      controller.aprovar(
        expect.any(Number),
        expect.any(AutorizarVoluntarioInputDto),
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('Deve dar erro ao enviar o e-mail', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new EMailSendError());
    await expect(() =>
      controller.aprovar(
        expect.any(Number),
        expect.any(AutorizarVoluntarioInputDto),
      ),
    ).rejects.toThrow(ServiceUnavailableException);
  });

  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error());
    await expect(() =>
      controller.aprovar(
        expect.any(Number),
        expect.any(AutorizarVoluntarioInputDto),
      ),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
