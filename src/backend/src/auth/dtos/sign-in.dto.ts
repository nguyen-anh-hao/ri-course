import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "../role/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
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
    
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    roles: [Role];
}
