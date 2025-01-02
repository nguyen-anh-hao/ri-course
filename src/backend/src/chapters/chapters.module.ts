import { Module } from "@nestjs/common";
import { ChaptersService } from "./chapters.service";
import { ChaptersController } from "./chapters.controller";
import { LessonsModule } from "src/lessons/lessons.module";
import { MentorPermissionsModule } from "src/mentor-permissions/mentor-permissions.module";
import { EnrollmentsModule } from "src/enrollments/enrollments.module";

@Module({
    imports: [LessonsModule, MentorPermissionsModule, EnrollmentsModule],
    controllers: [ChaptersController],
    providers: [ChaptersService],
    exports: [ChaptersService]
})
export class ChaptersModule {}