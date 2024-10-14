import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.strategy";
import { Role } from "src/auth/role/role.enum";
import { Roles } from "src/auth/role/roles.decorator";
import { RolesGuard } from "src/auth/role/roles.guard";

@Controller("users")
export class UsersController {
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
