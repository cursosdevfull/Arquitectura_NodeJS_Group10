import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth-controller';
import { AuthApplication } from '../application';
import {
    UserRepositoryAdapter,
    TokenServiceAdapter,
    HashServiceAdapter
} from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { userProviders } from '../../users/adapters/user-provider';

@Module({
    controllers: [AuthController],
    providers: [
        {
            provide: 'AuthApplication',
            useClass: AuthApplication,
        },
        {
            provide: 'UserRepository',
            useClass: UserRepositoryAdapter,
        },
        {
            provide: 'TokenService',
            useClass: TokenServiceAdapter,
        },
        {
            provide: 'HashService',
            useClass: HashServiceAdapter,
        },
        ...userProviders,
    ],
    imports: [
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'default-secret-key',
            signOptions: { expiresIn: '15m' },
        }),
    ],
    exports: ['AuthApplication', 'TokenService'],
})
export class AuthModule { }