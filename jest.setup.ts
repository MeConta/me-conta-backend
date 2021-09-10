import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config({
  path: './.test.env',
});

export const MOCKED_SALT = bcrypt.genSaltSync();
