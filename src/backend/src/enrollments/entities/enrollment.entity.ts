import { Enrollment } from "@prisma/client";

export class EnrollmentEntity implements Enrollment {
    constructor(partial : Partial<EnrollmentEntity>) {
        Object.assign(this, partial);
    }

    userId: number;
    courseId: number;
    createdAt: Date;
    level: string | null;
}