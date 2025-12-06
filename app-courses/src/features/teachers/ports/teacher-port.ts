import { Teacher } from '../models';

export interface TeacherPort {
  save(teacher: Teacher): void;
  getAll(): Teacher[];
  getOne(teacherId: number): Teacher | null;
  getByPage(page: number): Teacher[];
  update(teacherId: number, teacher: Teacher): void;
  delete(teacherId: number): void;
}
