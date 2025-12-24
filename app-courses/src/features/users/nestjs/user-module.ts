import { Module } from '@nestjs/common';
import { UserController } from './user-controller';
import { UserApplication } from '../application';
import { UserAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { userProviders } from '../adapters/user-provider';

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
        ...userProviders
    ],
    imports: [DatabaseModule],
})
export class UserModule { }