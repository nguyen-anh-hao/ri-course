import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { LessonEntity } from "./entities/lesson.entity";
import { UpdateLessonDto } from "./dtos/update-lesson.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard, RolesGuard } from "src/auth/guards";
import { Role, Roles } from "src/auth/role";
import { MentorGuard } from "src/courses/guards/mentor.guard";

@UseGuards(JwtAuthGuard)
@Controller("lessons")
export class LessonsController {
    constructor(private lessonsService: LessonsService) {}

    @ApiOperation({
        summary: "Get all lessons in the specified chapter"
    })
    @ApiOkResponse({
        description: "Fetch all lessons in the specified chapter successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: access denied"
    })
    @ApiBearerAuth()
    @Get()
    async findAll(@Query("chapterId", ParseIntPipe) chapterId: number) : Promise<LessonEntity[]> {
        return await this.lessonsService.findAll({ chapterId });
    }

    // -----------------------------------------------

    @ApiOperation({
        summary: "Upload content (string or file) to the lesson (Permitted Mentor only)"
    })
    @ApiQuery({
        name: "text",
        description: "true for uploading string, file otherwise"
    })
    @ApiBody({
        description: "contains the content string when text=true"
    })
    @ApiCreatedResponse({
        description: "Uploaded content successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: access denied"
    })
    @ApiBearerAuth()
    @UseGuards(RolesGuard, MentorGuard)
    @Roles(Role.Mentor)
    @Post(":id/content")
    @UseInterceptors(FileInterceptor('file'))
    async uploadContent(
        @Query("text", ParseBoolPipe) isText: boolean,
        @Body("content") content: string,
        @UploadedFile() file: Express.Multer.File,
        @Param("id", ParseIntPipe) id: number
    ) {
        if (isText) {
            const uploadResult = await this.lessonsService.uploadText(content);
            const result = await this.updateLesson(id, {
                contentUrl: uploadResult.public_id
            });

            return result;
        }

        const uploadResult = await this.lessonsService.uploadContent(file);
        const result = await this.updateLesson(id, {
            contentUrl: uploadResult.public_id
        });
        
        return result;
    }
    
    // -----------------------------------------------
    
    @ApiOperation({
        summary: "Update content (string or file) to the lesson (Permitted Mentor only)"
    })
    @ApiQuery({
        name: "text",
        description: "true for uploading string, file otherwise"
    })
    @ApiQuery({
        name: "old_url",
        description: "old public url of the previous content"
    })
    @ApiBody({
        description: "contains the content string when text=true"
    })
    @ApiCreatedResponse({
        description: "Uploaded content successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: access denied"
    })
    @ApiBearerAuth()
    @UseGuards(RolesGuard, MentorGuard)
    @Roles(Role.Mentor)
    @UseInterceptors(FileInterceptor('file'))
    @Patch(":id/content")
    async updateContent(
        @Query("text", ParseBoolPipe) isText: boolean,
        @Body("content") content: string,
        @UploadedFile() file: Express.Multer.File,
        @Param("id", ParseIntPipe) id: number,
        @Query("old_url") oldUrl: string
    ) {
        if (isText) {
            const uploadResult = await this.lessonsService.updateText(content, oldUrl);
            const result = await this.updateLesson(id, {
                contentUrl: uploadResult.public_id
            });

            return result;
        }

        const uploadResult = await this.lessonsService.updateContent(file, oldUrl);
        const result = await this.updateLesson(id, {
            contentUrl: uploadResult.public_id
        });

        return result; 
    }


    // -----------------------------------------------

    @ApiOperation({
        summary: "Update a lesson (Permitted Mentor only)"
    })
    @ApiOkResponse({
        description: "Lesson updated successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: access denied"
    })
    @ApiBearerAuth()
    @UseGuards(RolesGuard, MentorGuard)
    @Roles(Role.Mentor)
    @Patch(":id")
    async updateLesson(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateLessonDto: UpdateLessonDto
    ) : Promise<LessonEntity> {
        return await this.lessonsService.updateOne(id, updateLessonDto);
    }
    
    // -----------------------------------------------
    
    @ApiOperation({
        summary: "Delete a lesson (Permitted Mentor only)"
    })
    @ApiOkResponse({
        description: "Lesson deleted successfully"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized: missing JWT"
    })
    @ApiForbiddenResponse({
        description: "Forbidden: access denied"
    })
    @ApiBearerAuth()
    @UseGuards(RolesGuard, MentorGuard)
    @Roles(Role.Mentor)
    @Delete(":id")
    async deleteLesson(@Param("id", ParseIntPipe) id: number) : Promise<LessonEntity> {
        return await this.lessonsService.deleteOne(id);
    }

    @Post(":id/submission")
    async addSubmission(
        @Param("id", ParseIntPipe) id : number
    ) {
        // const uploadResult = await this.lessonsService.uploadContent()
    }

    @Delete(":lessonId/submission/:submissionId")
    async deleteSubmission(
        @Param("lessonId", ParseIntPipe) lessonId: number,
        @Param("submissionId", ParseIntPipe) submissionId: number
    ) {

    }
}