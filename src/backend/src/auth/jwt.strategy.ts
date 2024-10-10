import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import configuration from "../config/configuration";
import { Injectable } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configuration().security.jwt_secret,
        });
    }

    async validate(payload) {
        return { id: payload.sub, name: payload.name, roles: payload.roles };
    }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
