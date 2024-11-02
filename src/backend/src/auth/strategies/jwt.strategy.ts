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
        const { id, username, roles } = payload;

        return {
            id,
            username,
            roles,
        };
    }
}
