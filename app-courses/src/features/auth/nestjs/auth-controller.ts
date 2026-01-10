import {
    Body,
    Controller,
    HttpCode,
    Inject,
    Post,
} from '@nestjs/common';
import { AuthApplication } from '../application';
import { LoginRequestDto, RefreshTokenRequestDto } from './dtos';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AuthApplication')
        private readonly authApp: AuthApplication,
    ) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginRequestDto) {
        const result = await this.authApp.login(loginDto);

        return {
            message: 'Login successful',
            data: {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
            },
        };
    }

    @Post('refresh')
    @HttpCode(200)
    async refreshToken(@Body() refreshTokenDto: RefreshTokenRequestDto) {
        const result = await this.authApp.refreshToken(refreshTokenDto.refreshToken);

        return {
            message: 'Token refreshed successfully',
            data: {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
            },
        };
    }
}