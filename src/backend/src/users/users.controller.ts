import { Controller, Get, Patch, Request, UseGuards } from "@nestjs/common";
import { Role, Roles } from "src/auth/role";
import { RolesGuard, JwtAuthGuard } from "src/auth/guards";
import { InfoUpdateGuard } from "src/users/guards";
import { UsersService } from "./users.service";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get("test")
    hehe(@Request() req) {
        return {
            message: "you can access this endpoint",
            ...req.user,
        };
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get("")
    findAll() {
        return this.usersService.findAll();
    }

    @Get("me")
    findMe(@Request() req) {
        return this.usersService.findOne(req.user.username);
    }

    @UseGuards(InfoUpdateGuard)
    @Patch("me")
    changeInfo(@Request() req) {
        return this.usersService.updateOne(req.user.username, req.body);
    }
}
