import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto";

export type User = {
    id: number;
    username: string;
    password: string;
    roles: string[];
};

@Injectable()
export class UsersService {
    users: User[] = [
        {
            id: 1,
            username: "user1",
            password: "user1",
            roles: ["Admin"],
        },
        {
            id: 2,
            username: "user2",
            password: "user2",
            roles: ["Learner"],
        },
        {
            id: 3,
            username: "user3",
            password: "user3",
            roles: ["Admin"],
        },
        {
            id: 4,
            username: "user4",
            password: "user4",
            roles: ["Admin"],
        },
        {
            id: 5,
            username: "user5",
            password: "user5",
            roles: ["Admin"],
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username);
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async isUsernameTaken(username: string): Promise<boolean> {
        const user = await this.findOne(username);
        return !!user;
    }

    async createOne(createUserDto : CreateUserDto) {
        const newUser: User = {
            // username: createUserDto.username,
            // password: createUserDto.password, // add some encryption here
            ...createUserDto,
            id: this.users.length + 1,
            roles: ["Learner"],
        };
        await this.users.push(newUser);
        console.log(newUser);
        return newUser;
    }
}
