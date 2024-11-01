import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CourseEntity } from "./entities/course.entity";

@Injectable()
export class CoursesService {
    constructor(private prisma : PrismaService) {}

    async findAll() : Promise<CourseEntity[]> {
        const courses = await this.prisma.course.findMany();

        return courses.map(course => new CourseEntity(course));
    }

    async create(createCourseDto: CreateCourseDto) : Promise<CourseEntity> {
        const course = await this.prisma.course.create({
            data: createCourseDto
        });

        return new CourseEntity(course);
    }

    async findOne(id: number) : Promise<CourseEntity> {
        const course = await this.prisma.course.findUnique({
            where: {
                id
            }
        });

        return new CourseEntity(course);
    }
}
