import { Enrollment } from '../models';

export interface EnrollmentPort {
  save(enrollment: Enrollment): void;
  getAll(): Enrollment[];
  getOne(enrollmentId: number): Enrollment | null;
  getByPage(page: number): Enrollment[];
  update(enrollmentId: number, enrollment: Enrollment): void;
  delete(enrollmentId: number): void;
}
