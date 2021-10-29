import type { Config } from '@jest/types';

// Sync object
const jest: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  setupFilesAfterEnv: ['../jest.setup.ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      astTransformers: {
        before: ['<rootDir>/swagger.e2e.js'],
      },
    },
  },
};
export default jest;