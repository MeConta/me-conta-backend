import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle(process.env.SWAGGER_NAME)
  .setDescription(process.env.SWAGGER_DESCRIPTION)
  .setVersion(process.env.SWAGGER_VERSION)
  .build();
