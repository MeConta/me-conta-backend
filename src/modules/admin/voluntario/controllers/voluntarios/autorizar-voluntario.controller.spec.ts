import { Test, TestingModule } from '@nestjs/testing';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  AutorizarVoluntario,
  VoluntarioNaoEncontradoError,
} from '../../../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import { createMock } from '@golevelup/ts-jest';
import { AutorizarVoluntarioInputDto } from '../../dto/autorizar-voluntario.dto';
import { AutorizarVoluntarioController } from './autorizar-voluntario.controller';

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
    await controller.aprovar(1, { aprovado: true });
    expect(useCase.execute).toBeCalledWith(
      expect.any(Number),
      expect.any(Boolean),
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

  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error());
    await expect(() =>
      controller.aprovar(
        expect.any(Number),
        expect.any(InternalServerErrorException),
      ),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
