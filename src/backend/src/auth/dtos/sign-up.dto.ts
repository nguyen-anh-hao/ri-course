import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
    @ApiProperty({
        example: "user1"
    })
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @ApiProperty({
        example: "user1"
    })
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @ApiPropertyOptional({
        example: "user1@ricourse.com"
    })
    @IsEmail()
    email?: string;
    
    @ApiPropertyOptional({
        example: new Date("2004-04-20")
    })
    @IsDate()
    dob?: Date;
}
