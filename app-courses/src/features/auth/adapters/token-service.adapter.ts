import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { TokenService } from '../ports';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenServiceAdapter implements TokenService {
    constructor(private readonly jwtService: JwtService, private configService: ConfigService) { }

    async generateAccessToken(userId: number, email: string, roles: string[]): Promise<string> {
        const payload = { sub: userId, email, roles };
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>("JWT_ACCESS_SECRET") as string,
            expiresIn: this.configService.get<string>("JWT_ACCESS_EXPIRATION") as any
        });
    }

    async generateRefreshToken(userId: number): Promise<string> {
        const payload = { sub: userId };
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>("JWT_REFRESH_SECRET") as string,
            expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRATION") as any
        });
    }

    async verifyAccessToken(token: string): Promise<{ userId: number; email: string; roles: string[] }> {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>("JWT_ACCESS_SECRET") as string,
        });
        return { userId: payload.sub, email: payload.email, roles: payload.roles || [] };
    }

    async verifyRefreshToken(token: string): Promise<{ userId: number }> {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>("JWT_REFRESH_SECRET") as string,
        });
        return { userId: payload.sub };
    }
}