import { Injectable } from "@nestjs/common";

export type User = {
    id: number;
    username: string;
    password: string;
    roles: string[];
    email: string;
};

@Injectable()
export class UsersService {
    users: User[] = [
        {
            id: 1,
            username: "user1",
            password: "user1",
            roles: ["Admin"],
            email: "user1@ricourse.com",
        },
        {
            id: 2,
            username: "user2",
            password: "user2",
            roles: ["Learner"],
            email: "user2@ricourse.com",
        },
        {
            id: 3,
            username: "user3",
            password: "user3",
            roles: ["Admin"],
            email: "user3@ricourse.com",
        },
        {
            id: 4,
            username: "user4",
            password: "user4",
            roles: ["Admin"],
            email: "user4@ricourse.com",
        },
        {
            id: 5,
            username: "user5",
            password: "user5",
            roles: ["Admin"],
            email: "user5@ricourse.com",
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username);
    }
}
