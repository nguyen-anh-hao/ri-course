import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpGuard } from "./guards/signup.guard";
import { SignInDto, SignUpDto } from "./dtos";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ChangePasswordGuard } from "./guards/change-password.guard";
import { ChangePasswordDto } from "./dtos/change-password.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("signin")
    signin(@Request() req: { user: SignInDto }) {
        return this.authService.signin(req.user);
    }

    @UseGuards(SignUpGuard)
    @Post("signup")
    signup(@Body() body: SignUpDto) {
        return this.authService.signup(body);
    }

    @UseGuards(JwtAuthGuard, ChangePasswordGuard)
    @Post("change-password")
    changePassword(@Body() body: ChangePasswordDto) {
        return this.authService.changePassword(body);
    }
}
