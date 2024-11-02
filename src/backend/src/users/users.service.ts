import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "./entities/user.entity";
import { $Enums } from "@prisma/client";
import { CourseEntity } from "src/courses/entities/course.entity";

@Injectable()
export class UsersService {
    constructor(private prisma : PrismaService) {}

    async findOne(username: string) : Promise<UserEntity> {
        const user = await this.prisma.user.findUnique({
            where: {
                username
            }
        });

        return new UserEntity(user);
    }

    async findAll() : Promise<UserEntity[]> {
        const users = await this.prisma.user.findMany();

        return users.map(user => new UserEntity(user));
    }

    async createOne(createUserDto: CreateUserDto) : Promise<UserEntity> {
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                roles: [$Enums.Role.Learner]
            }
        });
        
        return new UserEntity(user);
    }
    
    async updateOne(username: string, updateUserDto: UpdateUserDto) : Promise<UserEntity> {
        const user = await this.prisma.user.update({
            where: {
                username: username
            },
            data: updateUserDto
        });
        
        return new UserEntity(user);
    }

    async myCourses(username : string) : Promise<CourseEntity[]> {
        const courses = await this.prisma.course.findMany({
            select : {
                id: true,
                title: true,
                description: true,
                createAt: true,
                updatedAt: true,
                users: {
                    where: {
                        user: {
                            username
                        }
                    }
                }
            },
        });

        return courses.map(course => new CourseEntity(course));
    }

    async isUsernameTaken(username: string) : Promise<boolean> {
        const user = await this.findOne(username);
        return !!user;
    }
}
