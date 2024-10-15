import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from "@nestjs/common";
import * as CryptoJS from "crypto-js";
import configuration from "src/config/configuration";

@Injectable()
export class SignUpAuthGuard implements CanActivate {
    constructor() { }

    verifySignUpToken(
        token: string,
        userAgent: string,
        secret: string,
    ): boolean {
        const info = token.split("-");
        const expirationTime = +info[0];
        const hashedUserAgent = info[1];
        const hashedHashCombo = info[2];

        const now = new Date().getTime();
        if (expirationTime < now)
            throw new ForbiddenException("Sign up token expired");

        const thisHashedUserAgent = CryptoJS.MD5(userAgent).toString();
        if (thisHashedUserAgent !== hashedUserAgent)
            throw new ForbiddenException("Invalid sign up token");

        const thisHashCombo = `${expirationTime}-${thisHashedUserAgent}_${secret}`;
        const thisHashedHashCombo = CryptoJS.MD5(thisHashCombo).toString();

        if (thisHashedHashCombo !== hashedHashCombo)
            throw new ForbiddenException("Invalid sign up token");

        return true;
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const signUpToken = request.headers["sign-up-token"];
        const userAgent = request.headers["user-agent"];
        const signUpSecret = configuration().security.signUpSecret;

        if (this.verifySignUpToken(signUpToken, userAgent, signUpSecret) === false)
            return false;

        return true;
    }
}
