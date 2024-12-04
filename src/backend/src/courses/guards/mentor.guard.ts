import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { MentorPermissionsService } from "src/mentor-permissions/mentor-permissions.service";

@Injectable()
export class MentorGuard implements CanActivate {
    constructor(private mentorPermissionsService: MentorPermissionsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { user, params } = context.switchToHttp().getRequest();
        const mentorId = user.id;
        const courseId = +params.id;

        return this.mentorPermissionsService.isMentorPermitted(mentorId, courseId);
    }
}
