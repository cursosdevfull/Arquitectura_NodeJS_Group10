import { EnrollmentAdapter } from '../adapters';
import { Enrollment } from '../models';
import { EnrollmentPort } from '../ports';

export class EnrollmentApplication {
  private readonly adapter: EnrollmentPort;

  constructor() {
    this.adapter = new EnrollmentAdapter();
  }

  save(enrollment: Enrollment) {
    this.adapter.save(enrollment);
  }

  getAll() {
    return this.adapter.getAll();
  }

  getOne(enrollmentId: number) {
    return this.adapter.getOne(enrollmentId);
  }

  getByPage(page: number) {
    return this.adapter.getByPage(page);
  }

  update(enrollmentId: number, enrollment: Enrollment) {
    this.adapter.update(enrollmentId, enrollment);
  }

  delete(enrollmentId: number) {
    this.adapter.delete(enrollmentId);
  }
}
