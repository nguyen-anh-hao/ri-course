import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { JwtAuthGuard, RolesGuard } from "src/auth/guards";
import { Role, Roles } from "src/auth/role";

@UseGuards(JwtAuthGuard)
@Controller("courses")
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async create(@Body() createCourseDto: CreateCourseDto) {
        return await this.coursesService.create(createCourseDto);
    }
    
    @Get()
    async findAll() {
        return await this.coursesService.findAll();
    }
    
    @Get(":id")
    async findOne(@Param("id") id: string) {
        return await this.coursesService.findOne(+id);
    }
}
