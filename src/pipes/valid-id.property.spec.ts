import { IsValidProperty } from './valid-property.pipe';
import { CreateConsultaDto } from '../consulta/dto/create-consulta.dto';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';

describe('ValidIdPipe', () => {
  /*let registerDecorator;
  beforeEach(() => {
    registerDecorator = jest.fn((decorator) => decorator.validator.validate());
    jest.mock('class-validator', () => ({
      __esModule: true,
      registerDecorator,
      buildMessage: jest.fn(),
      // isInt: jest.fn().mockReturnValue(true),
    }));
  });
  // jest.spyOn(object, methodName).mockImplementation(() => customImplementation)
  it('Deve ser definido', () => {
    expect(IsValidProperty(jest.fn())).toBeDefined();
  });*/

  it('true', () => {
    expect(true).toBeTruthy();
  });

  // it('validate DTO', async () => {
  //   const target: ValidationPipe = new ValidationPipe({
  //     transform: true
  //   });
  //   const metadata: ArgumentMetadata = {
  //     type: 'body',
  //     metatype: CreateConsultaDto,
  //     data: JSON.stringify({ aluno: 1, atendente: 1, agenda: 1 }),
  //   };
  //   await target.transform(<CreateConsultaDto>{}, metadata).catch((err) => {
  //     console.log('AAAAAA', err);
  //     expect(true).toBeTruthy();
  //     //expect(err.message).toEqual(['atendente is not valid']);
  //   });
  // });
});
