import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import configuration from "./config/configuration";
import { ConfigModule } from "@nestjs/config";
import { CoursesModule } from "./courses/courses.module";

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        CoursesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
