import { Lesson } from "@prisma/client";

export class LessonEntity implements Lesson {
    constructor(partial : Partial<LessonEntity>) {
        Object.assign(this, partial);
    }

    id: number;
    createAt: Date;
    updatedAt: Date;

    chapterId: number;
    type: string;
    contentUrl: string;
}