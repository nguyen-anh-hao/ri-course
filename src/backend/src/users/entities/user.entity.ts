import { $Enums, User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
    constructor(partial : Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    id : number;
    createAt: Date;
    updatedAt: Date;

    @Exclude()
    password: string;
    
    username: string;
    email: string;
    roles: $Enums.Role[];

    fullname: string;
    dob: Date;
}