import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local.strategy";
import { SignUpAuthGuard } from "./signup.guard";
import { SignInDto, SignUpDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post("signin")
    signin(@Request() req: { user: SignInDto }) {
        return this.authService.signin(req.user);
    }

    @UseGuards(SignUpAuthGuard)
    @Post("signup")
    signup(@Body() body: SignUpDto) {
        return this.authService.signup(body);
    }
}
