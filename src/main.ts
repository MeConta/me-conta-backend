import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';

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

  // Swagger
  // TODO: ajustar para não aparecer no ambiente de produção
  /* if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, SwaggerConfig);
    SwaggerModule.setup('api', app, document);
  } */

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
export = bootstrap();
