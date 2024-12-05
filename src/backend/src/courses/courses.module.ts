import { Module } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CoursesController } from "./courses.controller";
import { EnrollmentsModule } from "src/enrollments/enrollments.module";
import { MentorPermissionsModule } from "src/mentor-permissions/mentor-permissions.module";

@Module({
    imports: [EnrollmentsModule, MentorPermissionsModule],
    controllers: [CoursesController],
    providers: [CoursesService],
})
export class CoursesModule {}
