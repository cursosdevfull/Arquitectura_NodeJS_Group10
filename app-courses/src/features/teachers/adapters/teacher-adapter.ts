import { Teacher } from '../models';
import { TeacherPort } from '../ports';

export class TeacherAdapter implements TeacherPort {
  private teachers: Teacher[] = [];

  save(teacher: Teacher): void {
    this.teachers.push(teacher);
  }

  getAll(): Teacher[] {
    return this.teachers;
  }

  getOne(teacherId: number): Teacher | null {
    const teacher = this.teachers.find(
      (t) => t.properties().teacherId === teacherId,
    );
    return teacher || null;
  }

  getByPage(page: number): Teacher[] {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.teachers.slice(startIndex, endIndex);
  }

  update(teacherId: number, teacher: Teacher): void {
    const index = this.teachers.findIndex(
      (t) => t.properties().teacherId === teacherId,
    );
    if (index !== -1) {
      this.teachers[index] = teacher;
    }
  }

  delete(teacherId: number): void {
    const index = this.teachers.findIndex(
      (t) => t.properties().teacherId === teacherId,
    );
    if (index !== -1) {
      this.teachers.splice(index, 1);
    }
  }
}
