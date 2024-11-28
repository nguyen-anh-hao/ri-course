import { Module } from "@nestjs/common";
import { EnrollmentsService } from "./enrollments.service";
import { EnrollmentsController } from "./enrollments.controller";

@Module({
    providers: [EnrollmentsService],
    exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
