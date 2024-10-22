import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsEmail, IsEmpty } from "class-validator";

export class UpdateUserDto {
    
    @IsEmpty()
    username : string;

    @IsEmpty()
    password : string;

    fullname : string;

    @IsEmail()
    email : string;
}
