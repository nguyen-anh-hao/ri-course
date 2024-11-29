import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { EnrollmentsService } from "./enrollments.service";
import { JwtAuthGuard, RolesGuard } from "src/auth/guards";
import { Roles, Role } from "src/auth/role";
import { CreateEnrollmentDto } from "./dtos";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@Controller("enrollments")
export class EnrollmentsController {
    constructor(private readonly enrollmentsService: EnrollmentsService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: "Find all existing enrollments on the system (Admin only)"
    })
    @ApiOkResponse({
        description: "Ok: Fetch enrollments successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: Missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: The user with the JWT must be an Admin"
    })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get("all")
    async findAll() {
        return await this.enrollmentsService.findAll();
    }
    
    // -----------------------------------------------
    
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Enroll in a course (Learner only)"
    })
    @ApiBody({
        type: CreateEnrollmentDto
    })
    @ApiCreatedResponse({
        description: "Created: Enrolled in a course successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Missing JWT"
    })
    @ApiForbiddenResponse({
        description: "The user with JWT must be a Learner"
    })
    @UseGuards(RolesGuard)
    @Roles(Role.Learner)
    @Post()
    async create(@Request() req) {
        const createEnrollmentDto : CreateEnrollmentDto = {
            userId: req.user.id,
            courseId: req.body.courseId
        }

        return await this.enrollmentsService.create(createEnrollmentDto);
    }
}
