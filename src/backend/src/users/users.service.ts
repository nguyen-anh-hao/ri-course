import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dtos";

export type User = {
    id: number;
    username: string;
    fullname?: string;
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
            password:
                "$2b$11$iF.vIFWlXJdkhQCnDIrgxuC/VeD4CvI4qH9B5puZrr83My2NiKF2S",
            email: "user1@ricourse.com",
            roles: ["Learner"],
        },
        {
            id: 2,
            username: "user2",
            password:
                "$2b$11$hlcxykhjO.YlVstp.z2zAOgj90mGK1Q3ejieZCnliOwlIsZ6mSwxu",
            email: "user2@ricourse.com",
            roles: ["Learner"],
        },
        {
            id: 3,
            username: "user3",
            password:
                "$2b$11$fWN8U2inFKp9bxiXzLK7N.ZW7pKr2G/X1kA3ZWBJBFpN2nRtgluYC",
            email: "user3@ricourse.com",
            roles: ["Learner"],
        },
        {
            id: 4,
            username: "user4",
            password:
                "$2b$11$x33wC4RG7xiWWNDix8HABO4NK67XpOei9hIX/ZrAdrjdDCZnvasri",
            email: "user4@ricourse.com",
            roles: ["Learner"],
        },
        {
            id: 5,
            username: "user5",
            password:
                "$2b$11$ezrTdQZaPAxN6jacU9lhPefzcVfbRWUIZaxN01kSDS/gY2Nj..tDu",
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

    async createOne(createUserDto: CreateUserDto) {
        const newUser: User = {
            ...createUserDto,
            id: this.users.length + 1,
            roles: ["Learner"],
        };
        await this.users.push(newUser);
        console.log(newUser);
        return newUser;
    }

    async updateOne(username: string, updateUserDto: UpdateUserDto) {
        const index = this.users.findIndex(
            (user) => user.username === username,
        );

        this.users[index] = {
            ...this.users[index],
            ...updateUserDto,
        };

        return this.users[index];
    }
}
