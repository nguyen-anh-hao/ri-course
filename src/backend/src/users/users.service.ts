import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "./entities/user.entity";
import { CourseEntity } from "src/courses/entities/course.entity";
import * as bcrypt from "bcrypt";

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
        const { username, password } = createUserDto;

        const isTaken = await this.isUsernameTaken(username);
        if (isTaken === true)
            throw new BadRequestException("Username is already taken");

        const hashedPassword = await bcrypt.hash(password, 11);

        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword
            }
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

    async getMyCourses(learnerId : number) : Promise<CourseEntity[]> {
        const precourses = await this.prisma.course.findMany({
            where: {
                learners: {
                    some: {
                        learnerId
                    }
                }
            },
            select: {
                id: true,
                createAt: true,
                updatedAt: true, 
                title: true,
                description: true,
                learners: {
                    select: {
                        learner: true
                    }
                },
                mentors: {
                    select: {
                        mentor: true
                    }
                }
            }
        });

        const courses = precourses.map(course => ({
            ...course,
            learners: course.learners.map(u => u.learner),
            mentors: course.mentors.map(u => u.mentor),
        }));

        return courses.map(course => new CourseEntity(course));
    }

    async getMyPermittedCourses(mentorId : number) : Promise<CourseEntity[]> {
        const precourses = await this.prisma.course.findMany({
            where: {
                mentors: {
                    some: {
                        mentorId
                    }
                }
            },
            select: {
                id: true,
                createAt: true,
                updatedAt: true, 
                title: true,
                description: true,
                learners: {
                    select: {
                        learner: true
                    }
                },
                mentors: {
                    select: {
                        mentor: true
                    }
                }
            }
        });

        const courses = precourses.map(course => ({
            ...course,
            learners: course.learners.map(u => u.learner),
            mentors: course.mentors.map(u => u.mentor),
        }));

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
