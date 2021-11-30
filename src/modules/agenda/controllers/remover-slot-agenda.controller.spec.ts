import { Test, TestingModule } from '@nestjs/testing';
import {
  RemoverSlotAgenda,
  SlotAgendaNaoEncontradoError,
  SlotNaoPertenceAoVoluntarioError,
  SlotNoPassadoError,
} from '../../../_business/agenda/casos-de-uso/remover-slot-agenda.feat';
import { createMock } from '@golevelup/ts-jest';
import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import { RemoverSlotAgendaController } from './remover-slot-agenda.controller';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';
import { IdParam } from '../../../_adapters/agenda/dto/id.param.dto';

describe('RemoverSlotAgendaController', () => {
  let controller: RemoverSlotAgendaController;
  let useCase: RemoverSlotAgenda;
  const user: ITokenUser = {
    ...createMock<ITokenUser>(),
    id: 1,
  };
  const idParam: IdParam = { id: expect.any(Number) };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RemoverSlotAgenda,
          useValue: createMock<RemoverSlotAgenda>(),
        },
      ],
      controllers: [RemoverSlotAgendaController],
    }).compile();
    controller = module.get<RemoverSlotAgendaController>(
      RemoverSlotAgendaController,
    );
    useCase = module.get<RemoverSlotAgenda>(RemoverSlotAgenda);
  });
  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });
  it('Deve chamar o caso de uso', async () => {
    await controller.remover({ id: 1 }, user);
    expect(useCase.execute).toBeCalledWith(1, 1);
  });
  it('Deve dar não encontrado caso o de slot não exista', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new SlotAgendaNaoEncontradoError());
    await expect(() => controller.remover(idParam, user)).rejects.toThrow(
      NotFoundException,
    );
  });
  it('Deve dar não encontrado caso o voluntário não exista ou não seja aprovado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new VoluntarioNaoEncontradoError());
    await expect(() => controller.remover(idParam, user)).rejects.toThrow(
      NotFoundException,
    );
  });
  it('Deve dar forbidden caso o slot não pertença ao voluntário', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new SlotNaoPertenceAoVoluntarioError());
    await expect(() => controller.remover(idParam, user)).rejects.toThrow(
      ForbiddenException,
    );
  });
  it('Deve dar unprocessable caso o slot esteja no passado', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new SlotNoPassadoError());
    await expect(() => controller.remover(idParam, user)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(Error);
    await expect(() => controller.remover(idParam, user)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
