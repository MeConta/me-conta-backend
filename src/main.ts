import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Utiliza pipes de validação global para os DTOS (Annotations)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Utiliza Interceptors de serialize global, habilitando class transform nas entidades
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT || 3000);
}
export = bootstrap();
