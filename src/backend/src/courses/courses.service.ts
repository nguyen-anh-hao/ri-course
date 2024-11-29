import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CourseEntity } from "./entities/course.entity";
import { UserEntity } from "src/users/entities/user.entity";

@Injectable()
export class CoursesService {
    constructor(private prisma : PrismaService) {}

    async findAll() : Promise<CourseEntity[]> {
        const courses = await this.prisma.course.findMany();

        return courses.map(course => new CourseEntity(course));
    }

    async createOne(createCourseDto: CreateCourseDto) : Promise<CourseEntity> {
        const course = await this.prisma.course.create({
            data: createCourseDto
        });

        return new CourseEntity(course);
    }

    async deleteOne(id: number) {
        const course = await this.prisma.course.delete({
            where: {
                id
            }
        });

        return new CourseEntity(course);
    }

    async findById(id: number) : Promise<CourseEntity> {
        const course = await this.prisma.course.findUnique({
            where: {
                id
            }
        });

        return new CourseEntity(course);
    }

    async findByTitle(title: string) : Promise<CourseEntity[]> {
        const courses = await this.prisma.course.findMany({
            where: {
                title
            }
        });

        return courses.map(course => new CourseEntity(course));
    }

    async findAllLearners(id: number) {
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

    async findAllMentors(id: number) {
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
