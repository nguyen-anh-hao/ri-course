import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty({
        example: "user1"
    })
    @IsNotEmpty()
    @IsString()
    oldPassword: string;
    
    @ApiProperty({
        example: "newpass"
    })
    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
