import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserEntity } from "./users/entities/user.entity";

@Injectable()
export class AppService {
    constructor(private prisma : PrismaService) {}

    getHello(): string {
        return "Hello World!";
    }

    async test() {
        const result = await this.prisma.course.findMany({
            select: {
                id: true,
                createAt: true,
                updatedAt: true, 
                title: true,
                learners: {
                    select: {
                        learner: true
                    }
                }
            }
        }) 

        return result;
    }
}
