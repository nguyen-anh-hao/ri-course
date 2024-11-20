import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuditLogsService {
    constructor(private prisma: PrismaService) {}

    async createAuditLogs(log) {
        const newAuditLog = await this.prisma.auditLog.create({
            data: log
        })
    }
}