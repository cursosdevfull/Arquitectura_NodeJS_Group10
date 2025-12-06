import { Course } from '../models';

export interface CoursePort {
  save(course: Course): void;
  getAll(): Course[];
  getOne(courseId: number): Course | null;
  getByPage(page: number): Course[];
  update(courseId: number, course: Course): void;
  delete(courseId: number): void;
}
