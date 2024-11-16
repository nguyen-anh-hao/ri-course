import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    controllers: [UsersController],
    providers: [UsersService, AuthService, JwtService],
    exports: [UsersService],
})
export class UsersModule {}
