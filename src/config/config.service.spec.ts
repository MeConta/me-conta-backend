import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  describe('Configurações do TypeOrm', () => {
    it('Deve recuperar dados do Typeorm', () => {
      service = new ConfigService();
    });
    it('Deve recuperar dados do Typeorm para env de development', () => {
      service = new ConfigService({
        NODE_ENV: 'development',
      });
    });
    it('Deve recuperar dados do Typeorm para env de production', () => {
      service = new ConfigService({
        NODE_ENV: 'production',
      });
    });
    afterEach(() => {
      expect(service.typeOrmOptions).toBeDefined();
    });
  });
});
