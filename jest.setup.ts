import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config({
  path: './.test.env',
});

export const DEFAULT_PASSWORD = `s3Nh@123`;
export const MOCKED_SALT = bcrypt.genSaltSync();
