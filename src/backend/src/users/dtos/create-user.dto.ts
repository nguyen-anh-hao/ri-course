import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: "user24",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @ApiProperty({
        example: "user24",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @ApiProperty({
        example: "user24@ricourse.com",
    })
    @IsEmail()
    email?: string;
    
    @ApiProperty({
        example: new Date(),
    })
    @IsDate()
    dob?: Date;
    
    @ApiProperty({
        example: [$Enums.Role.Mentor],
        required: true
    })
    @IsNotEmpty()
    roles: $Enums.Role[];
}
