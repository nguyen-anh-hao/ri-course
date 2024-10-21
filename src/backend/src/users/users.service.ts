import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dtos";

export type User = {
    id: number;
    username: string;
    password: string;
    email?: string;
    roles: string[];
};

@Injectable()
export class UsersService {
    users: User[] = [
        {
            id: 1,
            username: "user1",
            password: "user1",
            email: "user1@ricourse.com",
            roles: ["Admin"],
        },
        {
            id: 2,
            username: "user2",
            password: "user2",
            email: "user2@ricourse.com",
            roles: ["Learner"],
        },
        {
            id: 3,
            username: "user3",
            password: "user3",
            email: "user3@ricourse.com",
            roles: ["Admin"],
        },
        {
            id: 4,
            username: "user4",
            password: "user4",
            email: "user4@ricourse.com",
            roles: ["Admin"],
        },
        {
            id: 5,
            username: "user5",
            password: "user5",
            email: "user5@ricourse.com",
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

    async updateOne(username : string, updateUserDto : UpdateUserDto) {
        const index = this.users.findIndex(user => user.username === username);

        this.users[index] = {
            ...this.users[index],
            ...updateUserDto
        }

        return this.users[index];
    }
}
