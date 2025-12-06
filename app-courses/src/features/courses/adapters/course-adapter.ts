import { Course } from '../models';
import { CoursePort } from '../ports';

export class CourseAdapter implements CoursePort {
  private courses: Course[] = [];

  save(course: Course): void {
    this.courses.push(course);
    console.log(this.courses);
  }

  getAll(): Course[] {
    return this.courses;
  }

  getOne(courseId: number): Course | null {
    const course = this.courses.find(
      (c) => c.properties().courseId === courseId,
    );
    return course || null;
  }

  getByPage(page: number): Course[] {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.courses.slice(startIndex, endIndex);
  }

  update(courseId: number, course: Course): void {
    const index = this.courses.findIndex(
      (c) => c.properties().courseId === courseId,
    );
    if (index !== -1) {
      this.courses[index] = course;
    }
  }

  delete(courseId: number): void {
    const index = this.courses.findIndex(
      (c) => c.properties().courseId === courseId,
    );
    if (index !== -1) {
      this.courses.splice(index, 1);
    }
  }
}
