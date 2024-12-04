import { Module } from "@nestjs/common";
import { MentorPermissionsService } from "./mentor-permissions.service";

@Module({
    providers: [MentorPermissionsService],
    exports: [MentorPermissionsService],
})
export class MentorPermissionsModule {}