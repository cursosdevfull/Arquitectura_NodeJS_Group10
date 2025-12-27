import { Inject } from '@nestjs/common';
import { Course, CourseData } from '../models';
import type { CoursePort } from '../ports';
import { CustomErrorApplication, NameErrors } from '../../../core/errors';
import { ApplicationBase } from '../../../core/generics/application';
import { CourseDto } from './dtos';

export class CourseApplication extends ApplicationBase<Course, CourseData, CoursePort> {
  constructor(@Inject('CourseAdapter') adapter: CoursePort) {
    super(adapter, CourseDto.fromDomainToData, CourseDto.fromDataToDomain);
  }

  async save(course: Course) {
    const resultExists = await this.adapter.existsCourse(course.properties().title);

    if (resultExists) {
      throw new CustomErrorApplication(
        'Course exists',
        NameErrors.ERROR_COURSE_TITLE_EXISTS,
      );
    }


    await this.adapter.save(CourseDto.fromDomainToData(course) as CourseData);
  }

  async update(course: Course) {
    await this.adapter.save(CourseDto.fromDomainToData(course) as CourseData);
  }
}
