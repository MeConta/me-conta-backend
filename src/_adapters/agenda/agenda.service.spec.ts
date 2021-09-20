import { createConnection, Connection } from 'typeorm';

describe('Agenda Repo', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: ['./**/*.entity.ts'],
    });
  });
  beforeEach(async () => {
    await connection.synchronize(true);
  });
  afterAll(async () => {
    await connection.close();
  });
  it('should connect', function () {
    expect(connection.isConnected).toBeTruthy();
  });
});
