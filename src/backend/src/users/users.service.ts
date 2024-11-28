import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "./entities/user.entity";
import { $Enums } from "@prisma/client";
import { CourseEntity } from "src/courses/entities/course.entity";

@Injectable()
export class UsersService {
    constructor(private prisma : PrismaService) {}

    async findById(id: number) : Promise<UserEntity> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        });

        if (user === null)
            return null;
        
        return new UserEntity(user);
    }
    
    async findByUsername(username : string) : Promise<UserEntity> {
        const user = await this.prisma.user.findUnique({
            where: {
                username
            }
        });

        if (user === null)
            return null;
        
        return user;
    }

    async findAll(query) : Promise<UserEntity[]> {
        const users = await this.prisma.user.findMany({
            where: query
        });

        return users.map(user => new UserEntity(user));
    }

    async createOne(createUserDto: CreateUserDto) : Promise<UserEntity> {
        const user = await this.prisma.user.create({
            data: createUserDto
        });
        
        return new UserEntity(user);
    }
    
    async updateOne(id: number, updateUserDto: UpdateUserDto) : Promise<void> {
        const user = await this.prisma.user.update({
            where: {
                id
            },
            data: updateUserDto
        });
    }

    async getMyCourses(id : number) : Promise<CourseEntity[]> {
        const courses = await this.prisma.course.findMany({
            where: {
                users: {
                    some: {
                        userId: id
                    }
                }
            }
        });

        return courses.map(course => new CourseEntity(course));
    }

    async deleteOne(id: number) : Promise<UserEntity> {
        const user = await this.prisma.user.delete({
            where: {
                id
            }
        });

        return new UserEntity(user);
    }

    async isUsernameTaken(username: string) : Promise<boolean> {
        const user = await this.findByUsername(username);
        return !!user;
    }
}
