import { Module } from '@nestjs/common';
import { RoleController } from './role-controller';
import { RoleApplication } from '../application';
import { RoleAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { roleProviders } from '../adapters/role-provider';

@Module({
    controllers: [RoleController],
    providers: [
        {
            provide: 'RoleApplication',
            useClass: RoleApplication,
        },
        {
            provide: 'RoleAdapter',
            useClass: RoleAdapter,
        },
        ...roleProviders
    ],
    imports: [DatabaseModule],
})
export class RoleModule { }