import { Module } from "@nestjs/common";
import { EnrollmentsService } from "./enrollments.service";

@Module({
    providers: [EnrollmentsService],
    exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
