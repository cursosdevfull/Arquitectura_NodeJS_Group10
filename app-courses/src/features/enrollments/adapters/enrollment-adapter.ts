import { Enrollment } from '../models';
import { EnrollmentPort } from '../ports';

export class EnrollmentAdapter implements EnrollmentPort {
  private enrollments: Enrollment[] = [];

  save(enrollment: Enrollment): void {
    this.enrollments.push(enrollment);
  }

  getAll(): Enrollment[] {
    return this.enrollments;
  }

  getOne(enrollmentId: number): Enrollment | null {
    const enrollment = this.enrollments.find(
      (e) => e.properties().enrollmentId === enrollmentId,
    );
    return enrollment || null;
  }

  getByPage(page: number): Enrollment[] {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.enrollments.slice(startIndex, endIndex);
  }

  update(enrollmentId: number, enrollment: Enrollment): void {
    const index = this.enrollments.findIndex(
      (e) => e.properties().enrollmentId === enrollmentId,
    );
    if (index !== -1) {
      this.enrollments[index] = enrollment;
    }
  }

  delete(enrollmentId: number): void {
    const index = this.enrollments.findIndex(
      (e) => e.properties().enrollmentId === enrollmentId,
    );
    if (index !== -1) {
      this.enrollments.splice(index, 1);
    }
  }
}
