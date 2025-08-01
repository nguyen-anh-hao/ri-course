import { Module } from "@nestjs/common";
import { SubmissionsService } from "./submissions.service";
import { SubmissionsController } from "./submissions.controller";

@Module({
    controllers: [SubmissionsController],
    providers: [SubmissionsService],
    exports: [SubmissionsService]
})
export class SubmissionsModule {}