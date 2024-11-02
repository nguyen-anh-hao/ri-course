import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class ChangePasswordGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { user, body } = context.switchToHttp().getRequest();
        const usernameFromJWT = user.username;
        const requestUsername = body.username;

        if (usernameFromJWT !== requestUsername)
            throw new UnauthorizedException();

        const oldPassword = body.oldPassword;
        const realUser = await this.authService.validateUser(
            requestUsername,
            oldPassword,
        );
        if (realUser === null) throw new UnauthorizedException();

        return true;
    }
}
