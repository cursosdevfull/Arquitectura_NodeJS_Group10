import { Module } from '@nestjs/common';
import { SessionController } from './session-controller';
import { SessionApplication } from '../application';
import { SessionAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { sessionProviders } from '../adapters/session-provider';

@Module({
    controllers: [SessionController],
    providers: [
        {
            provide: 'SessionApplication',
            useClass: SessionApplication,
        },
        {
            provide: 'SessionAdapter',
            useClass: SessionAdapter,
        },
        ...sessionProviders
    ],
    imports: [DatabaseModule],
})
export class SessionModule { }