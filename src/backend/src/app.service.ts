import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { Role } from "@prisma/client";

@Injectable()
export class AppService {
    constructor(private prisma : PrismaService) {}

    getHello(): string {
        return "Hello World!";
    }

    async test() {
        return await this.prisma.user.findFirst({
            where: {
                username: "user1"
            },
            select: {
                courses: {
                    where: {
                        courseId: {
                            gt: 1
                        }
                    }
                }
            }
        });
    }
}
