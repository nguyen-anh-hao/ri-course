import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import configuration from "../../config/configuration";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configuration().security.jwtSecret,
        });
    }

    async validate(payload) {
        return {
            id: payload.id,
            username: payload.username,
            roles: payload.roles
        };
    }
}
