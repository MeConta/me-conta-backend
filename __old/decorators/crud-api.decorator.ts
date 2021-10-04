import {
  applyDecorators,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function GetApi() {
  return applyDecorators(
    Get(),
    ApiOkResponse({
      description: `Lista paginada de items com sucesso`,
    }),
  );
}

export function PostApi() {
  return applyDecorators(
    Post(),
    ApiBadRequestResponse({
      description: `Requisição inválida`,
    }),
    ApiUnprocessableEntityResponse({
      description: `Violação de regra de negócio`,
    }),
  );
}

export function GetOneApi(entity: any, path = ':id') {
  return applyDecorators(
    Get(path),
    ApiOkResponse({
      type: entity,
    }),
    ApiNotFoundResponse({
      description: `Item não encontrado`,
    }),
  );
}

export function PatchApi(path = ':id') {
  return applyDecorators(
    Patch(path),
    ApiNotFoundResponse({
      description: `Item não encontrado`,
    }),
    ApiBadRequestResponse({
      description: `Requisição inválida`,
    }),
    ApiUnprocessableEntityResponse({
      description: `Violação de regra de negócio`,
    }),
  );
}

export function DeleteApi(path = ':id') {
  return applyDecorators(
    Delete(path),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiNoContentResponse({
      description: `Item deletado com sucesso`,
    }),
    ApiNotFoundResponse({
      description: `Item não encontrado`,
    }),
  );
}

export function PaginatedApi() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      type: Number,
      required: false,
    }),
    ApiQuery({
      name: 'limit',
      type: Number,
      required: false,
    }),
  );
}
