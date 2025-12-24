import { Module } from '@nestjs/common';
import { StudentController } from './student-controller';
import { StudentApplication } from '../application';
import { StudentAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { studentProviders } from '../adapters/student-provider';

@Module({
    controllers: [StudentController],
    providers: [
        {
            provide: 'StudentApplication',
            useClass: StudentApplication,
        },
        {
            provide: 'StudentAdapter',
            useClass: StudentAdapter,
        },
        ...studentProviders
    ],
    imports: [DatabaseModule],
})
export class StudentModule { }