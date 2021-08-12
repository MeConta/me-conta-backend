import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
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

  static serviceMockFactory: () => MockType<any> = jest.fn(() => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }));
}
