import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from "@nestjs/common";

@Injectable()
export class InfoUpdateGuard implements CanActivate {
    constructor() {}

    canActivate(context: ExecutionContext): boolean {
        const { body } = context.switchToHttp().getRequest();

        if (body.roles !== null)
            throw new ForbiddenException(
                "You don't have permission to change this field",
            );

        if (body.password !== null)
            throw new ForbiddenException(
                "You need a higher level of authentication to change this field",
            );

        if (body.username !== null)
            throw new ForbiddenException("You can't change your username");

        return true;
    }
}
