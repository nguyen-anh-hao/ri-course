import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne(username);

        if (user && user.password === password) {
            return user;
        }

        return null;
    }

    async login(user) {
        const payload = {
            name: user.username,
            sub: user.id,
            roles: user.roles,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
