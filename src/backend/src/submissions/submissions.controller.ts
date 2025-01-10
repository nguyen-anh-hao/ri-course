import { Controller, Delete, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { SubmissionsService } from "./submissions.service";
import { JwtAuthGuard } from "src/auth/guards";

@UseGuards(JwtAuthGuard)
@Controller("submissions")
export class SubmissionsController {
    constructor(private submissionsService: SubmissionsService) {}

    

    @Delete(":id")
    async deleteSubmission(@Param("id", ParseIntPipe) id: number) {
        return await this.submissionsService.deleteSubmission(id);
    }
}