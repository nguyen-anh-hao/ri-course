import { Enrollment } from "@prisma/client";

export class EnrollmentEntity implements Enrollment {
    constructor(partial : Partial<EnrollmentEntity>) {
        Object.assign(this, partial);
    }

    learnerId: number;
    courseId: number;
    createdAt: Date;
    level: string | null;
}