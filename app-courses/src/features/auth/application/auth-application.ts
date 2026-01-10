import { Inject, Injectable } from '@nestjs/common';
import { CustomErrorApplication, NameErrors } from '../../../core/errors';
import { Credentials, TokenPair } from '../entities';
import type { UserRepository, TokenService, HashService } from '../ports';
import { LoginDto, LoginResponseDto } from './dtos';

@Injectable()
export class AuthApplication {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        @Inject('TokenService') private readonly tokenService: TokenService,
        @Inject('HashService') private readonly hashService: HashService,
    ) { }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        // Crear las credenciales
        const credentials = Credentials.create(loginDto.email, loginDto.password);

        // Buscar el usuario por email
        const user = await this.userRepository.findByEmail(credentials.email.value);
        if (!user) {
            throw new CustomErrorApplication(
                'Invalid credentials',
                NameErrors.ERROR_USER_NOT_FOUND,
            );
        }

        // Verificar la contraseña
        const isValidPassword = await this.hashService.verify(
            credentials.password,
            user.password,
        );
        if (!isValidPassword) {
            throw new CustomErrorApplication(
                'Invalid credentials',
                NameErrors.ERROR_INVALID_PASSWORD,
            );
        }

        // Generar tokens
        const accessToken = await this.tokenService.generateAccessToken(
            user.id,
            user.email,
            user.roles,
        );
        const refreshToken = await this.tokenService.generateRefreshToken(user.id);

        // Crear el par de tokens
        const tokenPair = TokenPair.create(accessToken, refreshToken);

        return new LoginResponseDto(tokenPair.accessToken, tokenPair.refreshToken);
    }

    async refreshToken(refreshToken: string): Promise<LoginResponseDto> {
        try {
            // Verificar el refresh token
            const payload = await this.tokenService.verifyRefreshToken(refreshToken);

            // Buscar el usuario
            const user = await this.userRepository.findById(payload.userId);
            if (!user) {
                throw new CustomErrorApplication(
                    'User not found',
                    NameErrors.ERROR_USER_NOT_FOUND,
                );
            }

            // Generar nuevos tokens
            const newAccessToken = await this.tokenService.generateAccessToken(
                user.id,
                user.email,
                user.roles,
            );
            const newRefreshToken = await this.tokenService.generateRefreshToken(user.id);

            return new LoginResponseDto(newAccessToken, newRefreshToken);
        } catch (error) {
            throw new CustomErrorApplication(
                'Invalid refresh token',
                NameErrors.ERROR_INVALID_TOKEN,
            );
        }
    }
}