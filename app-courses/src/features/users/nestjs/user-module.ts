import { Module } from '@nestjs/common';
import { UserController } from './user-controller';
import { UserApplication } from '../application';
import { UserAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { userProviders } from '../adapters/user-provider';
import { AuthModule, TokenServiceAdapter } from 'src/features/auth';

@Module({
    controllers: [UserController],
    providers: [
        {
            provide: 'UserApplication',
            useClass: UserApplication,
        },
        {
            provide: 'UserAdapter',
            useClass: UserAdapter,
        },
        {
            provide: "TokenService",
            useClass: TokenServiceAdapter
        },
        ...userProviders
    ],
    imports: [DatabaseModule, AuthModule],
    exports: [
        {
            provide: "TokenService",
            useClass: TokenServiceAdapter
        },
    ]
})
export class UserModule { }