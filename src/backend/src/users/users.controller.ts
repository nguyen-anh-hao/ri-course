import { ClassSerializerInterceptor, Controller, Get, Patch, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { Role, Roles } from "src/auth/role";
import { RolesGuard, JwtAuthGuard } from "src/auth/guards";
import { InfoUpdateGuard } from "src/users/guards";
import { UsersService } from "./users.service";
import { UserEntity } from "./entities/user.entity";
import { CourseEntity } from "src/courses/entities/course.entity";
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({
        summary: "Get all users (Admin only)",
    })
    @ApiOkResponse({
        description: "Ok: fetch all users successfully",
        type: [UserEntity]
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: the user with JWT provided must be an Admin"
    })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get("")
    async findAll() {
        return await this.usersService.findAll();
    }

    // -----------------------------------------------
    
    @ApiOperation({
        summary: "Get personal info of the user with provided JWT"
    })
    @ApiOkResponse({
        description: "Ok: fetch user's personal info successfully",
        type: UserEntity
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @Get("me")
    async findMe(@Request() req) {
        return await this.usersService.findOne(req.user.username);
    }
    
    // -----------------------------------------------

    @ApiOperation({
        summary: "Change user's personal info with provided JWT"
    })
    @ApiBody({
        description: "All the info want to be changed with its new value",
        examples: {
            "Basic info": {
                value: {
                    fullname: "newfullname",
                    email: "user1@ricourse.com.vn",
                    dob: new Date()
                }
            },
            "Invalid fields (username)": {
                value: {
                    username: "somenewusername"
                }
            },
            "Invalid fields (password)": {
                value: {
                    password: "newpassword"
                }
            },
            "Invalid fields (roles)": {
                value: {
                    roles: [Role.Admin]
                }
            }
        }
    })
    @ApiNoContentResponse({
        description: "No Content: user's info changed successfully"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: invalid changing fields"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @UseGuards(InfoUpdateGuard)
    @Patch("me")
    async changeInfo(@Request() req) {
        return await this.usersService.updateOne(req.user.username, req.body);
    }
    
    // -----------------------------------------------
    
    @ApiOperation({
        summary: "Get all current user's enrolled courses with provided JWT"
    })
    @ApiOkResponse({
        description: "Ok: Fetch all current user's enrolled courses successfully",
        type: [CourseEntity]
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @Get("me/courses")
    async getMyCourses(@Request() req) {
        return await this.usersService.getMyCourses(req.user.username);
    }
}
