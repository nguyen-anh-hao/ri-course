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
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dtos/create-course.dto";
import { JwtAuthGuard, RolesGuard } from "src/auth/guards";
import { Role, Roles } from "src/auth/role";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiExcludeController, ApiExcludeEndpoint, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CourseEntity } from "./entities/course.entity";
import { EnrollmentsService } from "src/enrollments/enrollments.service";
import { MentorPermissionsService } from "src/mentor-permissions/mentor-permissions.service";
import { UpdateCourseDto } from "./dtos/update-course.dto";
import { ChaptersService } from "src/chapters/chapters.service";
import { LessonsService } from "src/lessons/lessons.service";
import { CreateChapterDto } from "src/chapters/dtos/create-chapter.dto";
import { UpdateChapterDto } from "src/chapters/dtos/update-chapter.dto";
import { ChapterEntity } from "src/chapters/entities/chapter.entity";
import { CreateLessonDto } from "src/lessons/dtos/create-lesson.dto";
import { UpdateLessonDto } from "src/lessons/dtos/update-lesson.dto";
import { LessonEntity } from "src/lessons/entities/lesson.entity";

@Controller("courses")
export class CoursesController {
    constructor(
        private readonly coursesService: CoursesService,
        private readonly enrollmentsService: EnrollmentsService,
        private readonly mentorPermissionsService: MentorPermissionsService,
        private readonly chaptersService: ChaptersService,
        private readonly lessonsService: LessonsService,
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
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
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
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Delete(":id")
    async deleteCourse(@Param("id", ParseIntPipe) id: number) {
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
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Roles(Role.Learner)
    @Post(":id/learners")
    async createLearnerEnrollment(@Param("id", ParseIntPipe) id : number, @Request() req) {
        return await this.enrollmentsService.createOne({
            userId: req.user.id,
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
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Mentor)
    @Delete(":courseId/learners/:learnerId")
    async kickLearner(@Param("courseId", ParseIntPipe) courseId: number, @Param("learnerId", ParseIntPipe) learnerId: number) {
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
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Post(":id/mentors")
    async createMentorPermission(@Param("id", ParseIntPipe) courseId : number, @Body("mentorId", ParseIntPipe) mentorId) {
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
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Delete(":courseId/mentors/:mentorId")
    async kickMentor(@Param("courseId", ParseIntPipe) courseId: number, @Param("mentorId", ParseIntPipe) mentorId: number) {
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
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Roles(Role.Admin) 
    @Patch(":id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() updateCourseDto:UpdateCourseDto): Promise<CourseEntity> {
        return await this.coursesService.updateOne(id, updateCourseDto);
    }

    // ----------------------------------------------------------------------

    @Get(":courseId/chapters")
    async findAllChapters(@Param("courseId", ParseIntPipe) courseId : number) : Promise<ChapterEntity[]> {
        return await this.chaptersService.findAll({ courseId });
    }
    
    @Post(":courseId/chapters")
    async createChapter(
        @Param("courseId", ParseIntPipe) courseId: number,
        @Body() createChapterDto: CreateChapterDto
    ) : Promise<ChapterEntity> {
        return await this.chaptersService.createOne(courseId, createChapterDto);
    }
    
    @Patch(":courseId/chapters/:chapterId")
    async updateChapter(
        @Param("chapterId", ParseIntPipe) chapterId: number,
        @Body() updateChapterDto: UpdateChapterDto
    ) : Promise<ChapterEntity> {
        return await this.chaptersService.updateOne(chapterId, updateChapterDto);
    }
    
    @Delete(":courseId/chapters/:chapterId")
    async deleteChapter(@Param("chapterId", ParseIntPipe) chapterId: number) : Promise<ChapterEntity> {
        return await this.chaptersService.deleteOne(chapterId);
    }
    
    // ----------------------------------------------------------------------
    
    @Get(":courseId/chapters/:chapterId/lessons")
    async findAllLessons(@Param("chapterId", ParseIntPipe) chapterId: number) : Promise<LessonEntity[]> {
        return await this.lessonsService.findAll({ chapterId });
    }
    
    @Post(":courseId/chapters/:chapterId/lessons")
    async createLesson(
        @Param("chapterId", ParseIntPipe) chapterId: number,
        @Body() createLessonDto: CreateLessonDto
    ) : Promise<LessonEntity> {
        return await this.lessonsService.createOne(chapterId, createLessonDto);
    }
    
    @Patch(":courseId/chapters/:chapterId/lessons/:lessonId")
    async updateLesson(
        @Param("lessonId", ParseIntPipe) lessonId: number,
        @Body() updateLessonDto: UpdateLessonDto
    ) : Promise<LessonEntity> {
        return await this.lessonsService.updateOne(lessonId, updateLessonDto);
    }
    
    @Delete(":courseId/chapters/:chapterId/lessons/:lessonId")
    async deleteLesson(@Param("lessonId", ParseIntPipe) lessonId: number) : Promise<LessonEntity> {
        return await this.lessonsService.deleteOne(lessonId);
    }
}