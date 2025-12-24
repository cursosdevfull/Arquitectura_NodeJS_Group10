import { Module } from '@nestjs/common';
import { TeacherController } from './teacher-controller';
import { TeacherApplication } from '../application';
import { TeacherAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { teacherProviders } from '../adapters/teacher-provider';

@Module({
    controllers: [TeacherController],
    providers: [
        {
            provide: 'TeacherApplication',
            useClass: TeacherApplication,
        },
        {
            provide: 'TeacherAdapter',
            useClass: TeacherAdapter,
        },
        ...teacherProviders
    ],
    imports: [DatabaseModule],
})
export class TeacherModule { }