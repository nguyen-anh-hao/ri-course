import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
import { SubmissionsService } from "./submissions.service";
import { JwtAuthGuard } from "src/auth/guards";
import { ApiBody, ApiOperation, ApiQuery } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@Controller("submissions")
export class SubmissionsController {
    constructor(private submissionsService: SubmissionsService) {}

    @ApiOperation({
        summary: "Get all submissions based on learnerId or lessonId"
    })
    @ApiQuery({
        name: "lessonId",
        required: false
    })
    @ApiQuery({
        name: "learnerId",
        required: false
    })
    @Get()
    async findAll(
        @Query("lessonId") lessonId: number,
        @Query("learnerId") learnerId: number,
    ) {
        if (learnerId)
            return await this.submissionsService.findAll({ learnerId: +learnerId });
        
        return await this.submissionsService.findAll({ lessonId: +lessonId });
    }
    
    @ApiOperation({
        summary: "Grade a submission"
    })
    @ApiBody({
        schema: {
            properties: {
                point: { type: "number", example: 10 }
            }
        }
    })
    @Post(":id/grade")
    async grade(@Param("id", ParseIntPipe) id: number, @Body("point", ParseIntPipe) point: number) {
        return await this.submissionsService.grade(id, point);
    }
    
    @ApiOperation({
        summary: "Delete a submission"
    })
    @Delete(":id")
    async deleteSubmission(@Param("id", ParseIntPipe) id: number) {
        return await this.submissionsService.deleteSubmission(id);
    }
}