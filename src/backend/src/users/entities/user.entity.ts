import { ApiProperty } from "@nestjs/swagger";
import { $Enums, User } from "@prisma/client";
import { Exclude } from "class-transformer";
import { Role } from "src/auth/role";

export class UserEntity implements User {
    @ApiProperty()
    id : number;

    @ApiProperty({
        description: "The unix timestamp in which the user is created",
        example: new Date()
    })
    createAt: Date;

    @ApiProperty({
        description: "The unix timestamp in which the user is updated",
        example: new Date()
    })
    updatedAt: Date;
    
    @Exclude()
    password: string;
    
    @ApiProperty({
        description: "The role of the user is updated",
        example: [Role.Learner]
    })
    roles: $Enums.Role[];
    
    @ApiProperty({
        description: "The username of the user created",
        example: "user1"
    })
    username: string;

    @ApiProperty({
        description: "The email of the user created",
        example: "user1@ricourse.com"
    })
    email: string;
    
    @ApiProperty({
        description: "Fullname of the user created",
        example: null
    })
    fullname: string;

    @ApiProperty({
        description: "The date of birth of the user created",
        example: new Date("2004-04-20")
    })
    dob: Date;

    @ApiProperty({
        description: "The time this user last signed in",
        example: new Date("2004-04-20")
    })
    lastSignIn: Date;

    constructor(partial : Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}