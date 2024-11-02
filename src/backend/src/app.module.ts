import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import configuration from "./config/configuration";
import { ConfigModule } from "@nestjs/config";
import { CoursesModule } from "./courses/courses.module";
import { EnrollmentsModule } from "./enrollments/enrollments.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        CoursesModule,
        EnrollmentsModule,
        PrismaModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
