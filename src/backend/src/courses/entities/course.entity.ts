import { ApiProperty } from "@nestjs/swagger";
import { Course } from "@prisma/client";
import { UserEntity } from "src/users/entities/user.entity";

export class CourseEntity implements Course {
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

    thumbnailUrl: string;
    
    users?: UserEntity[];
    mentors?: UserEntity[];

    constructor(partial : Partial<CourseEntity>) {
        Object.assign(this, partial);
    }
}
