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
    Patch,
    UseInterceptors,
    ClassSerializerInterceptor,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dtos/create-course.dto";
import { JwtAuthGuard, RolesGuard } from "src/auth/guards";
import { Role, Roles } from "src/auth/role";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CourseEntity } from "./entities/course.entity";
import { EnrollmentsService } from "src/enrollments/enrollments.service";
import { MentorPermissionsService } from "src/mentor-permissions/mentor-permissions.service";
import { UpdateCourseDto } from "./dtos/update-course.dto";
import { ChaptersService } from "src/chapters/chapters.service";
import { CreateChapterDto } from "src/chapters/dtos/create-chapter.dto";
import { ChapterEntity } from "src/chapters/entities/chapter.entity";
import { CourseAccessGuard } from "./guards/course-access.guard";
import { MentorGuard } from "./guards/mentor.guard";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("courses")
export class CoursesController {
    constructor(
        private readonly coursesService: CoursesService,
        private readonly enrollmentsService: EnrollmentsService,
        private readonly mentorPermissionsService: MentorPermissionsService,
        private readonly chaptersService: ChaptersService,
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
    async findAllCourses(@Query("id") id? : number, @Query("title") title? : string) : Promise<CourseEntity[]> {

        if (id && title) 
            throw new BadRequestException("Only one of id or title of the course can be passed into the query");

        return await this.coursesService.findAll({ id: +id || undefined, title });
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Get detail chapter and lesson of a course (Admin, permitted Mentor or enrolled Learner)"
    })
    @ApiParam({
        name: "id",
        description: "course's id you want to get"
    })
    @ApiOkResponse({
        description: "Fetch all satisfied courses successfully",
        type: [CourseEntity]
    })
    @ApiUnauthorizedResponse({
        description: "Missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Not Admin or permitted Mentor or enrolled Learner"
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, CourseAccessGuard)
    @Get(":id")
    async getCourseDetail(@Param("id", ParseIntPipe) id: number) : Promise<CourseEntity> {
        return await this.coursesService.findDetail(id);
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "NOT IMPLEMENTED"
    })
    @Post(":id/thumbnail")
    async uploadThumbnail() {
        return true;
    }
    
    // -----------------------------------------------
    
    @ApiOperation({
        summary: "NOT IMPLEMENTED"
    })
    @Patch(":id/thumbnail")
    async updateThumbnail() {
        return false;
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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async createCourse(@Body() createCourseDto: CreateCourseDto) : Promise<CourseEntity> {
        return await this.coursesService.createOne(createCourseDto);
    }

    // -----------------------------------------------
    
    @ApiOperation({
        summary: "Delete a course (Admin only)"
    })
    @ApiOkResponse({
        description: "Ok: Deleted the given course successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: Missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: The user with the JWT must be an Admin"
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(":id")
    async deleteCourse(@Param("id", ParseIntPipe) id: number) : Promise<CourseEntity> {
        return await this.coursesService.deleteOne(id);
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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Learner)
    @Post(":id/learners")
    async createLearnerEnrollment(@Param("id", ParseIntPipe) id : number, @Request() req) {
        return await this.enrollmentsService.createOne({
            learnerId: req.user.id,
            courseId: id
        });
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Delete a learner enrollment from a course (Admin and Mentor only)"
    })
    @ApiOkResponse({
        description: "Ok: Kicked learner from course successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: Missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: The user with the JWT must be an Admin"
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Mentor)
    @Delete(":courseId/learners/:learnerId")
    async kickLearner(
        @Param("courseId", ParseIntPipe) courseId: number,
        @Param("learnerId", ParseIntPipe) learnerId: number
    ) {
        return await this.enrollmentsService.kickLearnerFromCourse(learnerId, courseId);
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Create a mentor permission for accessing a course (Admin only)"
    })
    @ApiBody({
        description: "Hi just example value hihi",
        examples: {
            1: {
                value: {
                    mentorId: 6
                }
            }
        }
    })
    @ApiCreatedResponse({
        description: "Created: Granted course access permission to mentor successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: Missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: The user with the JWT must be an Admin"
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post(":id/mentors")
    async createMentorPermission(
        @Param("id", ParseIntPipe) courseId : number,
        @Body("mentorId", ParseIntPipe) mentorId : number
    ) {
        return await this.mentorPermissionsService.permit({
            mentorId: mentorId,
            courseId: courseId
        });
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Delete a mentor permission from a course (Admin only)"
    })
    @ApiOkResponse({
        description: "Ok: Kicked mentor from the course successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: Missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: The user with the JWT must be an Admin"
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(":courseId/mentors/:mentorId")
    async kickMentor(
        @Param("courseId", ParseIntPipe) courseId: number,
        @Param("mentorId", ParseIntPipe) mentorId: number
    ) {
        return await this.mentorPermissionsService.unpermit({
            courseId,
            mentorId
        });
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Update a course (Admin only)"
    })
    @ApiBody({
        description: "Info of the course",
        type: UpdateCourseDto
    })
    @ApiCreatedResponse({
        description: "Updated: Course create successfully",
        type: CourseEntity
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: Missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: The user with the JWT must be an Admin"
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin) 
    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateCourseDto: UpdateCourseDto
    ): Promise<CourseEntity> {
        return await this.coursesService.updateOne(id, updateCourseDto);
    }

    // ----------------------------------------------------------------------
    
    @ApiOperation({
        summary: "Create a new chapter (Permitted Mentor only)"
    })
    @ApiParam({
        name: "id",
        description: "course's id you want to create a chapter in"
    })
    @ApiBody({
        type: CreateChapterDto
    })
    @ApiCreatedResponse({
        description: "Created a chapter in specified course successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Not Admin or permitted Mentor or enrolled Learner"
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard, MentorGuard)
    @Roles(Role.Mentor)
    @Post(":id/chapters")
    async createChapter(
        @Param("id", ParseIntPipe) id: number,
        @Body() createChapterDto: CreateChapterDto
    ) : Promise<ChapterEntity> {
        return await this.chaptersService.createOne(id, createChapterDto);
    }
}