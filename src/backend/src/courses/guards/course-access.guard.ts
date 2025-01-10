import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import { EnrollmentsService } from "src/enrollments/enrollments.service";
import { MentorPermissionsService } from "src/mentor-permissions/mentor-permissions.service";

@Injectable()
export class CourseAccessGuard implements CanActivate {
    constructor(
        private mentorPermissionsService: MentorPermissionsService,
        private enrollmentsService: EnrollmentsService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { user, params } = context.switchToHttp().getRequest();

        if (user.roles.include(Role.Admin))
            return true;
        
        const courseId = +params.id;
        
        if (user.roles.include(Role.Mentor)) {
            const mentorId = user.id;
            return this.mentorPermissionsService.isMentorPermitted(mentorId, courseId);
        }

        if (user.roles.include(Role.Learner)) {
            const learnerId = user.id;
            return this.enrollmentsService.enrolled(learnerId, courseId);
        }

        return false;
    }
}