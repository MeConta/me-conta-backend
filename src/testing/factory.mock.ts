import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};

export class FactoryMock {
  static repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      find: jest.fn((entity) => entity),
      findOne: jest.fn((entity) => entity),
      create: jest.fn((entity) => entity),
      save: jest.fn((entity) => entity),
      update: jest.fn((entity) => entity),
      softRemove: jest.fn((entity) => entity),
    }),
  );

  static crudServiceMockFactory: () => MockType<any> = jest.fn(() => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }));

  static mailerServiceMockFactory: () => MockType<any> = jest.fn(() => ({
    sendMail: jest.fn(),
  }));

  static mailServiceMockFactory: () => MockType<any> = jest.fn(() => ({
    sendContact: jest.fn(),
  }));

  static contatoServiceMockFactory: () => MockType<any> = jest.fn(() => ({
    send: jest.fn(),
  }));
}
