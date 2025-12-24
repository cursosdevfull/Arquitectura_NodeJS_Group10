import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { CourseData } from '../models';
import { CoursePort } from '../ports';
import { Repository } from 'typeorm';

export class CourseAdapter extends AdapterBase<CourseData> implements CoursePort {
  constructor(@Inject("COURSE_REPOSITORY") protected repository: Repository<CourseData>) {
    super(repository);
  }
  async existsCourse(title: string): Promise<boolean> {
    const course = await this.repository.findOne({ where: { title } as any });
    return course !== null;
  }
}
