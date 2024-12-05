import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SignInDto, SignUpDto,  ChangePasswordDto } from "./dtos";
import * as bcrypt from "bcrypt";
import { $Enums } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma : PrismaService
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findByUsername(username);
        if (user == null) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) return user;

        return null;
    }

    async signin(signInDto: SignInDto) {
        const { username, id, roles } = signInDto;

        const payload = {
            username,
            id,
            roles,
        };

        await this.prisma.user.update({
            where: {
                id
            },
            data: {
                lastSignIn: new Date()
            }
        })

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signup(signUpDto: SignUpDto) {
        return await this.usersService.createOne(
            {
                ...signUpDto,
                roles: [$Enums.Role.Learner]
            }
        );
    }

    async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
        const { newPassword } = changePasswordDto;

        const hashedNewPassword = await bcrypt.hash(newPassword, 11);

        return await this.usersService.updateOne(id, {
            password: hashedNewPassword,
        });
    }
}
