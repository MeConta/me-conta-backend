import type { Config } from '@jest/types';

// Sync object
const jest: Config.InitialOptions = {
  verbose: true,
  setupFilesAfterEnv: ['../jest.setup.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.module.ts',
    '!**/index.ts',
    '!**/*.stub.ts',
    '!**/*.mock.ts',
    '!**/*.entity.ts',
    '!**/*.dto.ts',
    '!**/*.enum.ts',
    '!**/*.config.ts',
    '!**/testing/',
    '!**/main.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
export default jest;
