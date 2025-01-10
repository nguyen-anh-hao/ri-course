import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SubmissionsService {
    constructor(private prisma: PrismaService) {}

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
            where: {id}
        });

        return result;
    }
}