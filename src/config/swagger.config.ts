import { DocumentBuilder } from '@nestjs/swagger';

export const TOKEN_NAME = `access-token`;

export const SwaggerConfig = new DocumentBuilder()
  .setTitle(process.env.SWAGGER_NAME)
  .setDescription(process.env.SWAGGER_DESCRIPTION)
  .setVersion(process.env.SWAGGER_VERSION)
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
    TOKEN_NAME,
  )
  .build();
