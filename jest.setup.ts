import { config } from 'dotenv-flow';
import * as bcrypt from 'bcrypt';
import 'reflect-metadata';

import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

config();

export const DEFAULT_PASSWORD = `s3Nh@F04r3$`;
export const DEFAULT_WRONG_PASSWORD = `s3Nh@Fr4c4`;
export const DEFAULT_PHONE = '11912345678';
export const MOCKED_SALT = bcrypt.genSaltSync();

export function getParamDecoratorFactory(decorator) {
  class Test {
    public test(@decorator() value) {
      return value;
    }
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}
