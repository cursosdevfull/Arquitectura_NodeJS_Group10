import { Student } from '../models';

export interface StudentPort {
  save(student: Student): void;
  getAll(): Student[];
  getOne(studentId: number): Student | null;
  getByPage(page: number): Student[];
  update(studentId: number, student: Student): void;
  delete(studentId: number): void;
}
