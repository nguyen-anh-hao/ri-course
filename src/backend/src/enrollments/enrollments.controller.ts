import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { EnrollmentsService } from "./enrollments.service";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/role/roles.decorator";
import { Role } from "src/auth/role/role.enum";
import { User } from "src/users/users.service";
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

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get("all")
    async findAll() {
        return await this.enrollmentsService.enrollments;
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Learner)
    @Get()
    async findAllEnrolled(@Request() req: { user: User }) {
        return await this.enrollmentsService.findByUserId(req.user.id);
    }
}
