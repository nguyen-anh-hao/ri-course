import { Module } from "@nestjs/common";
import { AuditLogsService } from "./audit-logs.service";

@Module({
    exports: [AuditLogsService]
})

export class AuditLogsModule {}