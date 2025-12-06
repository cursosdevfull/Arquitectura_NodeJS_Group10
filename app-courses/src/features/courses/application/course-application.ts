import { Inject } from '@nestjs/common';
import { Course } from '../models';
import type { CoursePort } from '../ports';

export class CourseApplication {
  constructor(@Inject('CourseAdapter') private readonly adapter: CoursePort) {}

  save(course: Course) {
    this.adapter.save(course);
  }

  getAll() {
    return this.adapter.getAll();
  }

  getOne(courseId: number) {
    return this.adapter.getOne(courseId);
  }

  getByPage(page: number) {
    return this.adapter.getByPage(page);
  }

  update(courseId: number, course: Course) {
    this.adapter.update(courseId, course);
  }

  delete(courseId: number) {
    this.adapter.delete(courseId);
  }
}
