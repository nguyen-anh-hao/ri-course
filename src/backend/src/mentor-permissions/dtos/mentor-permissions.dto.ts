import { IsNotEmpty, IsNumber } from "class-validator";

export class MentorPermissionDto {
    @IsNotEmpty()
    @IsNumber()
    courseId : number;
    
    @IsNotEmpty()
    @IsNumber()
    mentorId : number;
}