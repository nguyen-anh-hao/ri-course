import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ChaptersService } from "./chapters.service";
import { ChapterEntity } from "./entities/chapter.entity";
import { UpdateChapterDto } from "./dtos/update-chapter.dto";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard, RolesGuard } from "src/auth/guards";
import { Role, Roles } from "src/auth/role";
import { MentorGuard } from "src/courses/guards/mentor.guard";
import { LessonEntity } from "src/lessons/entities/lesson.entity";
import { CreateLessonDto } from "src/lessons/dtos/create-lesson.dto";
import { LessonsService } from "src/lessons/lessons.service";
import { CourseAccessGuard } from "src/courses/guards/course-access.guard";

@Controller("chapters")
export class ChaptersController {
    constructor(
        private chaptersService: ChaptersService,
        private lessonsService: LessonsService
    ) {}

    @ApiOperation({
        summary: "Get all chapters in a specified Course (usage /chapters?courseId=...)"
    })
    @ApiOkResponse({
        description: "Fetch chapter successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: Access denied"
    })
    @ApiNotFoundResponse({
        description: "Chapter not found with specified courseId"
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, CourseAccessGuard)
    @Get("")
    async findAll(@Query("courseId", ParseIntPipe) courseId: number) : Promise<ChapterEntity[]> {
        const chapters = await this.chaptersService.findAll({ courseId });

        return chapters.map(chapter => new ChapterEntity(chapter));
    }

    // ----------------------------------------------------------------------
    
    @ApiOperation({
        summary: "Create a new LESSON (Permitted Mentor only)"
    })
    @ApiBody({
        type: CreateLessonDto
    })
    @ApiCreatedResponse({
        description: "Chapter created successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: Not Admin or permitted Mentor"
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard, MentorGuard)
    @Roles(Role.Mentor)
    @Post(":id/lessons")
    async createLesson(
        @Param("id", ParseIntPipe) id: number,
        @Body() createLessonDto: CreateLessonDto
    ) : Promise<LessonEntity> {
        const lesson = await this.lessonsService.createOne(id, createLessonDto);
        
        return new LessonEntity(lesson);
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Update a chapter (Permitted Mentor only)"
    })
    @ApiBody({
        type: UpdateChapterDto
    })
    @ApiOkResponse({
        description: "Chapter updated successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: Not Admin or permitted Mentor"
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard, MentorGuard)
    @Roles(Role.Mentor)
    @Patch(":id")
    async updateChapter(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateChapterDto: UpdateChapterDto
    ) : Promise<ChapterEntity> {
        return await this.chaptersService.updateOne(id, updateChapterDto);
    }
    
    // -----------------------------------------------

    @ApiOperation({
        summary: "Delete a chapter (Permitted Mentor only)"
    })
    @ApiOkResponse({
        description: "Chapter deleted successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: Not Admin or permitted Mentor"
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard, MentorGuard)
    @Roles(Role.Mentor)
    @Delete(":id")
    async deleteChapter(@Param("id", ParseIntPipe) id: number) : Promise<ChapterEntity> {
        return await this.chaptersService.deleteOne(id);
    }
}