import { Module } from '@nestjs/common';
import { TeacherController } from './teacher-controller';
import { TeacherApplication } from '../application';
import { TeacherAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { teacherProviders } from '../adapters/teacher-provider';
import { CreateTeacherCommandHandler } from '../application/commands/create-teacher.command-handler';
import { GetAllTeacherQueryHandler } from '../application/queries/get-all-teacher.query-handler';
import { AuthModule } from 'src/features/auth';

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
        ...teacherProviders,
        CreateTeacherCommandHandler,
        GetAllTeacherQueryHandler
    ],
    imports: [DatabaseModule, AuthModule],
})
export class TeacherModule { }