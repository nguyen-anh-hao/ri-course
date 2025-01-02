import { MentorPermission } from "@prisma/client";

export class MentorPermissionEntity implements MentorPermission {
    mentorId: number;
    courseId: number;
}