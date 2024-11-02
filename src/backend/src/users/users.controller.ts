import { Body, Controller, Get, Patch, Query, Request, UseGuards } from "@nestjs/common";
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
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get("me")
    async findMe(@Request() req) {
        return await this.usersService.findOne(req.user.username);
    }
    
    @UseGuards(InfoUpdateGuard)
    @Patch("me")
    async changeInfo(@Request() req) {
        return await this.usersService.updateOne(req.user.username, req.body);
    }
    
    @Get("my-courses")
    async myCourse(@Request() req) {
        return await this.usersService.myCourses(req.user.username);
    }

    @Get("one")
    async findOne(@Query() query) {
        const result = await this.usersService.isUsernameTaken(query.username);
        console.log(result);
        return { isTaken: result }; 
    }
}
