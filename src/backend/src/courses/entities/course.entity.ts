import { Course } from "@prisma/client";

export class CourseEntity implements Course {
    constructor(partial : Partial<CourseEntity>) {
        Object.assign(this, partial);
    }

    id : number;
    createAt: Date;
    updatedAt: Date;

    title: string;
    description: string;
}
