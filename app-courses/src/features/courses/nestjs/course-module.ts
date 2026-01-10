import { Module } from '@nestjs/common';
import { CourseController } from './course-controller';
import { CourseApplication } from '../application';
import { CourseAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { courseProviders } from '../adapters/course-provider';
import { AuthModule } from 'src/features/auth';

@Module({
  controllers: [CourseController],
  providers: [
    {
      provide: 'CourseApplication',
      useClass: CourseApplication,
    },
    {
      provide: 'CourseAdapter',
      useClass: CourseAdapter,
    },
    ...courseProviders
  ],
  imports: [DatabaseModule, AuthModule],
})
export class CourseModule { }
