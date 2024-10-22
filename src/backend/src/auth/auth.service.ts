import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SignInDto, SignUpDto } from "./dtos";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOne(username);
        if (user == null)
            return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch)
            return user;

        return null;
    }

    async signin(user: SignInDto) {
        const payload = {
            username: user.username,
            id: user.id,
            roles: user.roles,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signup(user: SignUpDto) {
        const isTaken = await this.usersService.isUsernameTaken(user.username);
        if (isTaken === true)
            throw new BadRequestException("Username is already taken");

        const hashedPassword = await bcrypt.hash(user.password, 11);

        return await this.usersService.createOne({
            ...user,
            password: hashedPassword
        });
    }
}
