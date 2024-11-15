import { ApiProperty } from "@nestjs/swagger";
import { Course } from "@prisma/client";

export class CourseEntity implements Course {
    constructor(partial : Partial<CourseEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id : number;
    @ApiProperty()
    createAt: Date;
    @ApiProperty()
    updatedAt: Date;
    
    @ApiProperty({
        example: "provided title"
    })
    title: string;
    @ApiProperty({
        example: "provided description"
    })
    description: string;
}
