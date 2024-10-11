import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/jwt.strategy";
import { LocalAuthGuard } from "src/auth/local.strategy";
import { Role } from "src/auth/role/role.enum";
import { Roles } from "src/auth/role/roles.decorator";
import { RolesGuard } from "src/auth/role/roles.guard";

@Controller("users")
export class UsersController {
    constructor(private authService : AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get("test")
    hehe(@Request() req) {
        return {
            message: "you can access this endpoint",
            ...req.user,
        };
    }
}
