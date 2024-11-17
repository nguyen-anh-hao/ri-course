import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserEntity } from "./users/entities/user.entity";

@Injectable()
export class AppService {
    constructor(private prisma : PrismaService) {}

    getHello(): string {
        return "Hello World!";
    }

    async test(username : string) {
        const user = await this.prisma.user.delete({
            where: {
                username
            }
        });

        return new UserEntity(user);
    }
}
