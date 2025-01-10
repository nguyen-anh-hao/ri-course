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
        const { user, query } = context.switchToHttp().getRequest();

        if (user.roles.includes(Role.Admin))
            return true;
        
        const courseId = +query.courseId;
        
        if (user.roles.includes(Role.Mentor)) {
            const mentorId = user.id;
            return this.mentorPermissionsService.isMentorPermitted(mentorId, courseId);
        }

        if (user.roles.includes(Role.Learner)) {
            const learnerId = user.id;
            return this.enrollmentsService.enrolled(learnerId, courseId);
        }

        return false;
    }
}