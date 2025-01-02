import { Module } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CoursesController } from "./courses.controller";
import { EnrollmentsModule } from "src/enrollments/enrollments.module";
import { MentorPermissionsModule } from "src/mentor-permissions/mentor-permissions.module";
import { ChaptersModule } from "src/chapters/chapters.module";
import { LessonsModule } from "src/lessons/lessons.module";

@Module({
    imports: [EnrollmentsModule, MentorPermissionsModule, ChaptersModule, LessonsModule],
    controllers: [CoursesController],
    providers: [CoursesService],
})
export class CoursesModule {}
