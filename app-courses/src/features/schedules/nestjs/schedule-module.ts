import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule-controller';
import { ScheduleApplication } from '../application';
import { ScheduleAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { scheduleProviders } from '../adapters/schedule-provider';
import { AuthModule } from 'src/features/auth';

@Module({
    controllers: [ScheduleController],
    providers: [
        {
            provide: 'ScheduleApplication',
            useClass: ScheduleApplication,
        },
        {
            provide: 'ScheduleAdapter',
            useClass: ScheduleAdapter,
        },
        ...scheduleProviders
    ],
    imports: [DatabaseModule, AuthModule],
})
export class ScheduleModule { }
