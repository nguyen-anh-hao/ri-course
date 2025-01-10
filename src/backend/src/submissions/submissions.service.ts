import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SubmissionsService {
    constructor(private prisma: PrismaService) {}

    // async addSubmission(learnerId: number, lessonId: number, submissionUrl: string) {
    //     const result = await this.prisma.submission.create({
    //         data: {
    //             learnerId,
    //             lessonId,
    //             submissionUrl                 
    //         }
    //     });

    //     return result;
    // }

    // async deleteSubmission(id: number) {
    //     const result = await this.prisma.submission.delete({
    //         where: {id}
    //     });

    //     return result;
    // }
}