import { Module } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { MentorPermissionsModule } from "src/mentor-permissions/mentor-permissions.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { EnrollmentsModule } from "src/enrollments/enrollments.module";
import { SubmissionsModule } from "src/submissions/submissions.module";

@Module({
    imports: [EnrollmentsModule, MentorPermissionsModule, CloudinaryModule, SubmissionsModule],
    controllers: [LessonsController],
    providers: [LessonsService],
    exports: [LessonsService]
})
export class LessonsModule {}