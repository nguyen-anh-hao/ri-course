import { Lesson } from "@prisma/client";

export class LessonEntity implements Lesson {
    constructor(partial : Partial<LessonEntity>) {
        Object.assign(this, partial);
    }

    id: number;
    createAt: Date;
    updatedAt: Date;

    order: number;
    title: string;
    description: string;
    chapterId: number;
    type: string;
    contentUrl: string;
}