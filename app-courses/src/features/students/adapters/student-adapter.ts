import { Student } from '../models';
import { StudentPort } from '../ports';

export class StudentAdapter implements StudentPort {
  private students: Student[] = [];

  save(student: Student): void {
    this.students.push(student);
  }

  getAll(): Student[] {
    return this.students;
  }

  getOne(studentId: number): Student | null {
    const student = this.students.find(
      (s) => s.properties().studentId === studentId,
    );
    return student || null;
  }

  getByPage(page: number): Student[] {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.students.slice(startIndex, endIndex);
  }

  update(studentId: number, student: Student): void {
    const index = this.students.findIndex(
      (s) => s.properties().studentId === studentId,
    );
    if (index !== -1) {
      this.students[index] = student;
    }
  }

  delete(studentId: number): void {
    const index = this.students.findIndex(
      (s) => s.properties().studentId === studentId,
    );
    if (index !== -1) {
      this.students.splice(index, 1);
    }
  }
}
