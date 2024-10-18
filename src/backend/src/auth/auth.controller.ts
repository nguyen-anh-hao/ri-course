import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpAuthGuard } from "./guards/signup.guard";
import { SignInDto, SignUpDto } from "./dtos";
import { LocalAuthGuard } from "./guards/local-auth.guard";

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
