import { Test, TestingModule } from '@nestjs/testing';
import { CriarSlotAgendaController } from './criar-slot-agenda.controller';
import { createMock } from '@golevelup/ts-jest';
import {
  CriarNovoSlotDeAgenda,
  UsuarioNaoAtendenteError,
  VoluntarioNaoAprovadoError,
} from '../../../_business/agenda/casos-de-uso/criar-novo-slot-de-agenda.feat';
import { CreateSlotAgendaDto } from '../../../_adapters/agenda/dto/create-slot-agenda.dto';
import * as moment from 'moment';
import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsuarioNaoEncontradoError } from '../../../_business/usuarios/erros/usuarios.errors';

describe('CriarNovoSlotDeAgendaController', () => {
  let controller: CriarSlotAgendaController;
  let useCase: CriarNovoSlotDeAgenda;
  const request = {
    slots: [{ inicio: moment().toDate() }],
  } as CreateSlotAgendaDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CriarNovoSlotDeAgenda,
          useValue: createMock<CriarNovoSlotDeAgenda>(),
        },
      ],
      controllers: [CriarSlotAgendaController],
    }).compile();

    controller = module.get<CriarSlotAgendaController>(
      CriarSlotAgendaController,
    );
    useCase = module.get<CriarNovoSlotDeAgenda>(CriarNovoSlotDeAgenda);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve cadastrar um slot de agenda', async () => {
    await controller.create(request, { id: 1 });
    expect(useCase.execute).toBeCalled();
  });
  it('Deve dar erro se o usuário não for atendente', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new UsuarioNaoAtendenteError());
    await expect(() => controller.create(request, { id: 1 })).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
  it('Deve dar erro se o atendente não estiver aprovado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new VoluntarioNaoAprovadoError());
    await expect(() => controller.create(request, { id: 1 })).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
  it('Deve dar erro de usuário não encontrado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new UsuarioNaoEncontradoError());
    await expect(() => controller.create(request, { id: 1 })).rejects.toThrow(
      NotFoundException,
    );
  });
  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error());
    await expect(() => controller.create(request, { id: 1 })).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
