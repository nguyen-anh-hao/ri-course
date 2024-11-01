import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SignInDto, SignUpDto } from "./dtos";
import * as bcrypt from "bcrypt";
import { ChangePasswordDto } from "./dtos/change-password.dto";

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

    async signin(signInDto: SignInDto) {
        const { username, id, roles } = signInDto;

        const payload = {
            username,
            id,
            roles,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signup(signUpDto : SignUpDto) {
        const { username, password } = signUpDto; 

        const isTaken = await this.usersService.isUsernameTaken(username);
        if (isTaken === true)
            throw new BadRequestException("Username is already taken");

        const hashedPassword = await bcrypt.hash(password, 11);
        
        return await this.usersService.createOne({
            ...signUpDto,
            password: hashedPassword
        });
    }
    
    async changePassword(changePasswordDto : ChangePasswordDto) {
        const { username, newPassword } = changePasswordDto;

        const hashedNewPassword = await bcrypt.hash(newPassword, 11);

        return await this.usersService.updateOne(username, {
            password: hashedNewPassword
        });
    }
}
