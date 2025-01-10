import { Submission } from "@prisma/client";

export class SubmissionEntity implements Submission {
    id: number;
    createAt: Date;
    updatedAt: Date;

    learnerId: number;
    lessonId: number;
    contentUrl: string;

    grade: number;
}