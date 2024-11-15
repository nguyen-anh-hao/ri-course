import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Query,
    BadRequestException,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { JwtAuthGuard, RolesGuard } from "src/auth/guards";
import { Role, Roles } from "src/auth/role";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CourseEntity } from "./entities/course.entity";

@UseGuards(JwtAuthGuard)
@Controller("courses")
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: "Create a course (Admin only)"
    })
    @ApiBody({
        description: "Info of the course",
        type: CreateCourseDto
    })
    @ApiCreatedResponse({
        description: "Created: Course create successfully",
        type: CourseEntity
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: Missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: The user with the JWT must be an Admin"
    })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async create(@Body() createCourseDto: CreateCourseDto) : Promise<CourseEntity> {
        return await this.coursesService.create(createCourseDto);
    }
    
    // -----------------------------------------------

    @ApiBearerAuth()
    @ApiOperation({
        summary: "Get all existing courses on the system based on some criteria"
    })
    @ApiQuery({
        name: "id",
        required: false,
        description: "Pass this key to query based on the course's id"
    })
    @ApiQuery({
        name: "title",
        required: false,
        description: "Pass this key to query based on the course's title"
    })
    @ApiOkResponse({
        description: "Fetch all satisfied courses successfully",
        type: [CourseEntity]
    })
    @ApiUnauthorizedResponse({
        description: "Missing JWT"
    })
    @ApiBadRequestResponse({
        description: "May be both id and title are presented on the query string"
    })
    @Get()
    async findAll(@Query() query) : Promise<CourseEntity[]> {
        const { id, title } = query;

        if (id && title) 
            throw new BadRequestException("Only one of id or title of the course can be passed into the course query");
            
        if (id)
            return [await this.coursesService.findOneById(+id)];
        
        if (title)
            return await this.coursesService.findOneByTitle(title);

        return await this.coursesService.findAll();
    }

}
