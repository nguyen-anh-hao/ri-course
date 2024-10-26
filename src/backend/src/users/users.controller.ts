import { Controller, Get, Patch, Request, UseGuards } from "@nestjs/common";
import { Role } from "src/auth/role/role.enum";
import { Roles } from "src/auth/role/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { InfoUpdateGuard } from "src/auth/guards/info-update.guard";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get("test")
    hehe(@Request() req) {
        return {
            message: "you can access this endpoint",
            ...req.user,
        };
    }
    
    @Get("all")
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    findMe(@Request() req) {
        return this.usersService.findOne(req.user.username);
    }

    @UseGuards(JwtAuthGuard, InfoUpdateGuard)
    @Patch("me/change_info")
    changeInfo(@Request() req) {
        return this.usersService.updateOne(req.user.username, req.body);
    }
}
