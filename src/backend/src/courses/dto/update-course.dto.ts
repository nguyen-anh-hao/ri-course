import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCourseDto } from "./create-course.dto";

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @ApiProperty({
        description: "Title of the course",
        example: "Introduction to Advanced Algorithms",
    })
    title?: string;

    @ApiProperty({
        description: "Description of the course",
        example: "A deep dive into algorithmic principles and their applications.",
    })
    description?: string;
}
