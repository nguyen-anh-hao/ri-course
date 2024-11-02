import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

export type Course = {
    id: number;
    title: string;
    description: string;
};

@Injectable()
export class CoursesService {
    courses: Course[] = [
        {
            id: 1,
            title: "Nhap mon lap trinh",
            description: "Hoc cac kien thuc co ban",
        },
        {
            id: 2,
            title: "Ky thuat lap trinh",
            description: "Kien thuc vua",
        },
        {
            id: 3,
            title: "DSA",
            description: "Kien thuc nang cao",
        },
    ];
    async create(createCourseDto: CreateCourseDto) {
        const newCourse: Course = {
            ...createCourseDto,
            id: this.courses.length + 1,
        };
        await this.courses.push(newCourse);
        console.log(newCourse);
        return newCourse;
    }

    async findAll() {
        return this.courses;
    }

    async findOne(id: number) {
        return this.courses.find((course) => id === course.id);
    }

    update(id: number, updateCourseDto: UpdateCourseDto) {
        return `This action updates a #${id} course`;
    }

    remove(id: number) {
        return `This action removes a #${id} course`;
    }
}
