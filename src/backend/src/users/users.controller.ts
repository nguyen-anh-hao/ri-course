import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, Query, Req, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { Role, Roles } from "src/auth/role";
import { RolesGuard, JwtAuthGuard } from "src/auth/guards";
import { InfoUpdateGuard } from "src/users/guards";
import { UsersService } from "./users.service";
import { UserEntity } from "./entities/user.entity";
import { CourseEntity } from "src/courses/entities/course.entity";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateUserDto } from "./dtos";
import { AuditLogsService } from "src/audit-logs/audit-logs.service";

@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService,
        private auditLogsService: AuditLogsService
    ) {}

    
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
        return await this.usersService.findById(+req.user.id);
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
        console.log("hi")
        return await this.usersService.updateOne(+req.user.id, req.body);
    }
    
    // -----------------------------------------------

    @ApiOperation({
        summary: "Get all users with optional criteria (Admin only)",
    })
    @ApiQuery({
        name: "role",
        required: false
    })
    @ApiOkResponse({
        description: "Ok: fetch all users successfully",
        type: [UserEntity]
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbbiden: The user with the JWT must be an Admin"
    })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get("")
    async findAll(@Query() query) {
        return await this.usersService.findAll(query);
    }
 
    // -----------------------------------------------

    @ApiOperation({
        summary: "Create a new user (Admin only)"
    })
    @ApiBody({
        type: CreateUserDto
    })
    @ApiCreatedResponse({
        description: "Created: create a user successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbbiden: The user with the JWT must be an Admin"
    })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Post("")
    async createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
        const newUser = await this.usersService.createOne(createUserDto);
        await this.auditLogsService.createOne({
            actionType: "Create",
            userId: newUser.id,
            adminId: req.user.id
        })
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Update a user's info (Admin only)"
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "Id of the user you want to update"
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
            "username": {
                value: {
                    username: "somenewusername"
                }
            },
            "password": {
                value: {
                    password: "newpassword"
                }
            },
            "roles": {
                value: {
                    roles: [Role.Admin]
                }
            }
        }
    })
    @ApiNoContentResponse({
        description: "Updated: update a user's info successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbbiden: The user with the JWT must be an Admin"
    })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Patch(":id")
    async updateUser(@Param("id", ParseIntPipe) id : number, @Req() req) {
        const beforeUpdate = await this.usersService.findById(id);
        await this.usersService.updateOne(id, req.body);
        const afterUpdate = await this.usersService.findById(id);
        
        await this.auditLogsService.createOne({
            actionType: "Update",
            userId: id,
            adminId: req.user.id,
            before: beforeUpdate,
            after: afterUpdate
        });
    }
    
    // -----------------------------------------------

    @ApiOperation({
        summary: "Delete a user (Admin only)"
    })
    @ApiParam({
        name: "id",
        required: true,
        description: "Id of the user you want to delete"
    })
    @ApiOkResponse({
        description: "Deleted: delete a user successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbbiden: The user with the JWT must be an Admin"
    })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Delete(":id")
    async deleteUser(@Param("id", ParseIntPipe) id : number, @Req() req) {
        return await this.usersService.deleteOne(id);
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
        return await this.usersService.getMyCourses(+req.user.id);
    }
}
