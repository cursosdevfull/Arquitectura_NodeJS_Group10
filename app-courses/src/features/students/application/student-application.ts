import { StudentAdapter } from '../adapters';
import { Student } from '../models';
import { StudentPort } from '../ports';

export class StudentApplication {
  private readonly adapter: StudentPort;

  constructor() {
    this.adapter = new StudentAdapter();
  }

  save(student: Student) {
    this.adapter.save(student);
  }

  getAll() {
    return this.adapter.getAll();
  }

  getOne(studentId: number) {
    return this.adapter.getOne(studentId);
  }

  getByPage(page: number) {
    return this.adapter.getByPage(page);
  }

  update(studentId: number, student: Student) {
    this.adapter.update(studentId, student);
  }

  delete(studentId: number) {
    this.adapter.delete(studentId);
  }
}
