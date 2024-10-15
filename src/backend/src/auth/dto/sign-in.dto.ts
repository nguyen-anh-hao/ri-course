import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "../role/role.enum";

export class SignInDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    roles: [Role];
}
