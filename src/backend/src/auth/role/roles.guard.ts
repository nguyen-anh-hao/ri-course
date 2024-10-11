import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            "roles",
            [context.getHandler(), context.getClass()],
        );

        console.log(context.getClass());

        if (!requiredRoles)
            return false;

        const { user } = context.switchToHttp().getRequest();

        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}
