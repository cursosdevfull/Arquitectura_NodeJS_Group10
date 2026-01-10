import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import type { TokenService } from "../../features/auth/ports";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(@Inject('TokenService') private readonly tokenService: TokenService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid authorization header');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Missing access token');
        }

        try {
            const payload = await this.tokenService.verifyAccessToken(token);
            request.user = payload; // Adjuntar información del usuario al request
            return true;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Access token has expired');
            } else if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('Invalid or malformed access token');
            } else {
                throw new UnauthorizedException('Token verification failed');
            }
        }
    }
}