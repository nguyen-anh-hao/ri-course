import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SignInDto, SignUpDto } from "./dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOne(username);

        if (user && user.password === password) { // add some decryption here
            return user;
        }

        return null;
    }

    async signin(user: SignInDto) {
        const payload = {
            name: user.username,
            sub: user.id,
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

        return await this.usersService.createOne(user);
    }
}
