import { Module } from '@nestjs/common';
import { CourseController } from './course-controller';
import { CourseApplication } from '../application';
import { CourseAdapter } from '../adapters';

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
  ],
})
export class CourseModule {}
