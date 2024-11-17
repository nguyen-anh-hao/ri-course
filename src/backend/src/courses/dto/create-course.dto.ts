import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseDto {

    @ApiProperty({
        description: "Title of the course",
        example: "Introduction to C++ programming"
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: "Brief description about this course",
        example: "This course provides a comprehensive introduction to the C++ programming language, designed for beginners with little to no prior programming experience. Students will learn the fundamentals of programming, including variables, data types, control structures, functions, and basic object-oriented programming concepts. Through hands-on exercises and projects, participants will develop problem-solving skills and gain practical experience in writing, compiling, and debugging C++ programs. By the end of the course, students will be able to create simple yet functional C++ applications and have a solid foundation for further study in computer science and software development."
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}
