import { NumberVO, DateVO } from '../../../core/value-objects';
import { Schedule, Student } from '../entities';

export class Enrollment {
  private readonly enrollmentId: number;
  private schedule: Schedule;
  private student: Student;
  private date: Date;
  private deletedAt: Date | undefined;

  constructor(schedule: Schedule, student: Student, date: Date) {
    NumberVO.create('ScheduleId', schedule.scheduleId, 1);
    NumberVO.create('StudentId', student.studentId, 1);
    DateVO.create('Date', date);

    this.enrollmentId = Math.floor(Math.random() * 1000);
    this.schedule = schedule;
    this.student = student;
    this.date = date;
  }

  properties() {
    return {
      enrollmentId: this.enrollmentId,
      schedule: this.schedule,
      student: this.student,
      date: this.date,
      deletedAt: this.deletedAt,
    };
  }
}
