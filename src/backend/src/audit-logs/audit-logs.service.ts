import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuditLogsService {
    constructor(private prisma: PrismaService) {}

    async createAuditLogs(log) {
        const newAuditLog = await this.prisma.auditLog.upsert({
            where: {
                id: -1
            },
            update: {},
            create: log
        })
    }

    async deleteAuditLogs(userId: number) {
        try {

            await this.prisma.auditLog.deleteMany({
                where: {
                    userId
                }
            })
        } catch(e) {
            console.log(e)
        }
    }
}