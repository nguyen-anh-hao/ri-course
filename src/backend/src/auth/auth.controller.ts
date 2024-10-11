import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.strategy';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    login(@Request() req) {
        return this.authService.login(req.user);
    }
}
