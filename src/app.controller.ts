import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    type: Date,
  })
  getHello(): Date {
    return new Date();
  }
}
