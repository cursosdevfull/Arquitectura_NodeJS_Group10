import { TeacherAdapter } from '../adapters';
import { Teacher } from '../models';
import { TeacherPort } from '../ports';

export class TeacherApplication {
  private readonly adapter: TeacherPort;

  constructor() {
    this.adapter = new TeacherAdapter();
  }

  save(teacher: Teacher) {
    this.adapter.save(teacher);
  }

  getAll() {
    return this.adapter.getAll();
  }

  getOne(teacherId: number) {
    return this.adapter.getOne(teacherId);
  }

  getByPage(page: number) {
    return this.adapter.getByPage(page);
  }

  update(teacherId: number, teacher: Teacher) {
    this.adapter.update(teacherId, teacher);
  }

  delete(teacherId: number) {
    this.adapter.delete(teacherId);
  }
}
