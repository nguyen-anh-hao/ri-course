import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
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

        const oldPassword = body.oldPassword;
        const realUser = await this.authService.validateUser(
            usernameFromJWT,
            oldPassword,
        );
        if (realUser) 
            return true;
        
        throw new ForbiddenException();
    }
}
