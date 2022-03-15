import { Controller, Post, Redirect } from '@nestjs/common';

@Controller('auth')
export class LogoutController {
  @Redirect(`https://me-conta-frontend.herokuapp.com/`, 301)
  @Post('logout')
  async logout() {
    return;
  }
}
