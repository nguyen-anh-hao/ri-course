import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateEnrollmentDto {
    @IsNotEmpty()
    @IsNumber()
    userId : number;
    
    @IsNotEmpty()
    @IsNumber()
    courseId: number;
}