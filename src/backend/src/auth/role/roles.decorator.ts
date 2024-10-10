import { SetMetadata } from "@nestjs/common";
import { Role } from "src/auth/role/role.enum";

// This decorator is used to handily adds the "required roles" to the endpoints
export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);
