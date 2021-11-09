import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp, setupSwagger } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  setupApp(app);
  setupSwagger(app);

  await app.listen(process.env.PORT || 3000);
}

export default bootstrap();
