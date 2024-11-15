import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateEnrollmentDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({
        example: 4
    })
    @IsNotEmpty()
    @IsNumber()
    courseId: number;
}
