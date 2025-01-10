import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SubmissionsService {
    constructor(private prisma: PrismaService) {}

    async findAll(query: any) {
        const result = await this.prisma.submission.findMany({
            where: query
        })

        return result;
    }

    async grade(id: number, point: number) {
        const result = await this.prisma.submission.update({
            where: { id },
            data: {
                grade: point
            }
        })

        return result;
    }

    async addSubmission(learnerId: number, lessonId: number, contentUrl: string) {
        const result = await this.prisma.submission.create({
            data: {
                learnerId,
                lessonId,
                contentUrl                 
            }
        });

        return result;
    }

    async deleteSubmission(id: number) {
        const result = await this.prisma.submission.delete({
            where: { id }
        });

        return result;
    }
}