import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ChapterEntity } from "./entities/chapter.entity";
import { CreateChapterDto } from "./dtos/create-chapter.dto";
import { UpdateChapterDto } from "./dtos/update-chapter.dto";

@Injectable()
export class ChaptersService {
    constructor(private prisma: PrismaService) {}

    async findAll(query: any) : Promise<ChapterEntity[]> {
        const chapters = await this.prisma.chapter.findMany({
            where: query
        });

        return chapters.map(chapter => new ChapterEntity(chapter));
    }

    async createOne(courseId: number, createChapterDto: CreateChapterDto) : Promise<ChapterEntity> {
        const newChapter = await this.prisma.chapter.create({
            data: {
                ...createChapterDto,
                courseId
            }
        });

        return new ChapterEntity(newChapter);
    }

    async updateOne(id: number, updateChapterDto: UpdateChapterDto) : Promise<ChapterEntity> {
        const updatedChapter = await this.prisma.chapter.update({
            where: { id },
            data: updateChapterDto
        })

        return new ChapterEntity(updatedChapter);
    }

    async deleteOne(id: number) : Promise<ChapterEntity> {
        const deletedChapter = await this.prisma.chapter.delete({
            where: {id}
        })

        return new ChapterEntity(deletedChapter);
    }
}