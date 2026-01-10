import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment-controller';
import { EnrollmentApplication } from '../application';
import { EnrollmentAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { enrollmentProviders } from '../adapters/enrollment-provider';
import { AuthModule } from 'src/features/auth';

@Module({
    controllers: [EnrollmentController],
    providers: [
        {
            provide: 'EnrollmentApplication',
            useClass: EnrollmentApplication,
        },
        {
            provide: 'EnrollmentAdapter',
            useClass: EnrollmentAdapter,
        },
        ...enrollmentProviders
    ],
    imports: [DatabaseModule, AuthModule],
})
export class EnrollmentModule { }