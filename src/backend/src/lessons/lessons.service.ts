import { PrismaService } from "src/prisma/prisma.service";
import { LessonEntity } from "./entities/lesson.entity";
import { CreateLessonDto } from "./dtos/create-lesson.dto";
import { UpdateLessonDto } from "./dtos/update-lesson.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LessonsService {
    constructor(
        private prisma: PrismaService,
        private cloudinary: CloudinaryService
    ) {}

    async findAll(query: any) : Promise<LessonEntity[]> {
        const lessons = await this.prisma.lesson.findMany({
            where: query
        });

        return lessons.map(lesson => new LessonEntity(lesson));
    }
    
    async createOne(chapterId: number, createLessonDto: CreateLessonDto) : Promise<LessonEntity> {
        console.log("before");
        console.log(this.prisma); // this gets undefined
        const newLesson = await this.prisma.lesson.create({
            data: {
                ...createLessonDto,
                chapterId
            }
        })
        console.log("after");

        return new LessonEntity(newLesson);
    }

    async updateOne(id: number, updateLessonDto: UpdateLessonDto) : Promise<LessonEntity> {
        const updatedLesson = await this.prisma.lesson.update({
            where: { id },
            data: updateLessonDto
        });

        return new LessonEntity(updatedLesson);
    }

    async deleteOne(id: number) : Promise<LessonEntity> {
        const deletedLesson = await this.prisma.lesson.delete({
            where: { id } 
        });

        return new LessonEntity(deletedLesson);
    }

    async uploadContent(file: Express.Multer.File) {
        return await this.cloudinary.uploadFile(file);
    }

    async updateContent(file: Express.Multer.File, oldUrl: string) {
        return await this.cloudinary.updateFile(file, oldUrl);
    }

    async uploadText(content: string) {
        return await this.cloudinary.uploadText(content);
    }

    async updateText(content: string, oldUrl: string) {
        return await this.cloudinary.updateText(content, oldUrl);
    }
}