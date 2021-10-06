import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './swagger.config';

export function setupApp(app: INestApplication): INestApplication {
  // Utiliza pipes de validação global para os DTOS (Annotations)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Utiliza Interceptors de serialize global, habilitando class transform nas entidades
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  return app;
}

export function setupSwagger(app: INestApplication): INestApplication {
  // Swagger
  // TODO: ajustar para não aparecer no ambiente de produção
  /* if (process.env.NODE_ENV !== 'production') {
      const document = SwaggerModule.createDocument(app, SwaggerConfig);
      SwaggerModule.setup('api', app, document);
    } */

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, document);

  return app;
}
