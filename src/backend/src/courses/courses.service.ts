import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dtos/create-course.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CourseEntity } from "./entities/course.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { UpdateCourseDto } from "./dtos/update-course.dto";

@Injectable()
export class CoursesService {
    constructor(private prisma : PrismaService) {}

    async findAll(query: any) : Promise<CourseEntity[]> {
        const precourses = await this.prisma.course.findMany({
            where: query,
            select: {
                id: true,
                createAt: true,
                updatedAt: true, 
                title: true,
                description: true,
                users: {
                    select: {
                        user: true
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
            users: course.users.map(u => u.user),
            mentors: course.mentors.map(u => u.mentor),
        }));

        return courses.map(course => new CourseEntity(course));
    }

    async createOne(createCourseDto: CreateCourseDto) : Promise<CourseEntity> {
        const course = await this.prisma.course.create({
            data: createCourseDto
        });

        return new CourseEntity(course);
    }

    async updateOne(id: number, updateCourseDto: UpdateCourseDto): Promise<CourseEntity> {
        const course = await this.prisma.course.update({
            where: {id},
            data: updateCourseDto
        });

        return new CourseEntity(course);
    }

    async deleteOne(id: number) : Promise<CourseEntity> {
        const course = await this.prisma.course.delete({
            where: {
                id
            }
        });

        return new CourseEntity(course);
    }

    async findAllLearners(id: number) : Promise<UserEntity[]> {
        const users = await this.prisma.user.findMany({
            where: {
                courses: {
                    some: {
                        courseId: id
                    }
                }
            }
        });

        return users.map(user => new UserEntity(user));
    }

    async findAllMentors(id: number) : Promise<UserEntity[]> {
        const users = await this.prisma.user.findMany({
            where: {
                authorizedCourses: {
                    some: {
                        courseId: id
                    }
                }
            }
        });

        return users.map(user => new UserEntity(user));
    }
}
