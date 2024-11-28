import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Query,
    BadRequestException,
    Delete,
    ParseIntPipe,
    Param,
    Request,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { JwtAuthGuard, RolesGuard } from "src/auth/guards";
import { Role, Roles } from "src/auth/role";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CourseEntity } from "./entities/course.entity";
import { EnrollmentsService } from "src/enrollments/enrollments.service";
import { MentorPermissionsService } from "src/mentor-permissions/mentor-permissions.service";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("courses")
export class CoursesController {
    constructor(
        private readonly coursesService: CoursesService,
        private readonly enrollmentsService: EnrollmentsService,
        private readonly mentorPermissionsService: MentorPermissionsService,
    ) {}

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
    async findAll(@Query("id") id? : number, @Query("title") title? : string) : Promise<CourseEntity[]> {

        if (id && title) 
            throw new BadRequestException("Only one of id or title of the course can be passed into the course query");
            
        if (id)
            return [await this.coursesService.findOneById(+id)];
        
        if (title)
            return await this.coursesService.findOneByTitle(title);

        return await this.coursesService.findAll();
    }

    // -----------------------------------------------

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

    @ApiOperation({
        summary: "Find all learners enrolled in a course"
    })
    @ApiOkResponse({
        description: "Ok: Fetch all learners in a course successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: Missing JWT"
    })
    @Get(":id/learners")
    async findAllLearners(@Param("id", ParseIntPipe) id : number) {
        return await this.coursesService.findAllLearners(id);
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Enroll in a course (Learner only)"
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
    @Post(":id/learners")
    async createLearnerEnrollment(@Param("id", ParseIntPipe) id : number, @Request() req) {
        return await this.enrollmentsService.create({
            userId: req.user.id,
            courseId: id
        });
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Delete a learner enrollment from a course (Admin only) NOT IMPLEMENTED"
    })
    @Delete(":courseId/learners/:learnerId")
    async kickLearner() {

    }

    @ApiOperation({
        summary: "Find all mentors in a course"
    })
    @Get(":id/mentors")
    async findAllMentors(@Param("id", ParseIntPipe) id : number) {
        return this.coursesService.findAllMentors(id);
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Create a mentor permission for accessing a course (Admin only)"
    })
    @Post(":id/mentors")
    async createMentorPermission(@Param("id", ParseIntPipe) id : number, @Body() body) {
        return await this.mentorPermissionsService.assign({
            mentorId: body.mentorId,
            courseId: id
        });
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Delete a mentor permission from a course (Admin only) NOT IMPLEMENTED"
    })
    @Delete(":courseId/mentors/:mentorId")
    async kickMentor() {

    }
}