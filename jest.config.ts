import type { Config } from '@jest/types';

// Sync object
const jest: Config.InitialOptions = {
  verbose: true,
  detectOpenHandles: true,
  setupFilesAfterEnv: ['../jest.setup.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: ['<rootDir>/__old/'],
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
    '!**/*.auth.dto.ts.ts',
    '!**/*.enum.ts',
    '!**/*.config.ts',
    '!**/testing/',
    '!**/main.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
export default jest;
