import { Chapter } from "@prisma/client";

export class ChapterEntity implements Chapter {
    constructor(partial : Partial<ChapterEntity>) {
        Object.assign(this, partial);
    }

    id: number;
    createAt: Date;
    updatedAt: Date;

    courseId: number;
    title: string;
    description: string;
}