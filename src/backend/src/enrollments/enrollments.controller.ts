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

@UseGuards(JwtAuthGuard)
@Controller("enrollments")
export class EnrollmentsController {
    constructor(private readonly enrollmentsService: EnrollmentsService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.Learner)
    @Post()
    async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
        return await this.enrollmentsService.create(createEnrollmentDto);
    }
    
    // -----------------------------------------------

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get("all")
    async findAll() {
        return await this.enrollmentsService.findAll();
    }

    // -----------------------------------------------

    @UseGuards(RolesGuard)
    @Roles(Role.Learner)
    @Get()
    async findAllEnrolled(@Request() req) {
        return await this.enrollmentsService.findByUserId(req.user.id);
    }
}
