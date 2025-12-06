import { NumberVO, DateVO, LengthVO } from '../../../core/value-objects';
import { Schedule, Student } from '../entities';

export class Certificate {
  private readonly certificateId: number;
  private schedule: Schedule;
  private student: Student;
  private dateEmission: Date;
  private key: string;
  private deletedAt: Date | undefined;

  constructor(
    schedule: Schedule,
    student: Student,
    dateEmission: Date,
    key: string,
  ) {
    NumberVO.create('ScheduleId', schedule.scheduleId, 1);
    NumberVO.create('StudentId', student.studentId, 1);
    const dateEmissionVO = DateVO.create('Date', dateEmission);
    const keyVO = LengthVO.create('Key', key, 10);

    this.certificateId = Math.floor(Math.random() * 1000);
    this.schedule = schedule;
    this.student = student;
    this.dateEmission = dateEmissionVO.value;
    this.key = keyVO.value;
  }

  properties() {
    return {
      certificateId: this.certificateId,
      schedule: this.schedule,
      student: this.student,
      dateEmission: this.dateEmission,
      key: this.key,
      deletedAt: this.deletedAt,
    };
  }
}
