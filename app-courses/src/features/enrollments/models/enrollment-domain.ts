import { NumberVO, DateVO } from '../../../core/value-objects';
import { Schedule, Student } from '../entities';

type EnrollmentEssentials = {
  schedule: Schedule;
  student: Student;
  enrollmentDate: Date;
}

type EnrollmentOptionals = {
  id: number
}

type EnrollmentProps = EnrollmentEssentials & Partial<EnrollmentOptionals>;
type EnrollmentUpdate = Partial<EnrollmentEssentials>;

export class Enrollment {
  private readonly id: number;
  private schedule: Schedule;
  private student: Student;
  private enrollmentDate: Date;
  private deletedAt: Date | undefined;

  constructor(props: EnrollmentProps) {
    NumberVO.create('ScheduleId', props.schedule.id, 1);
    NumberVO.create('StudentId', props.student.id, 1);
    DateVO.create('Enrollment Date', props.enrollmentDate);

    if (props.id) {
      this.id = props.id;
    }
    this.schedule = props.schedule;
    this.student = props.student;
    this.enrollmentDate = props.enrollmentDate;
  }

  properties() {
    return {
      id: this.id,
      schedule: this.schedule,
      student: this.student,
      enrollmentDate: this.enrollmentDate,
      deletedAt: this.deletedAt,
    };
  }

  update(props: EnrollmentUpdate) {
    if (props.schedule) {
      NumberVO.create('ScheduleId', props.schedule.id, 1);
      this.schedule = props.schedule;
    }
    if (props.student) {
      NumberVO.create('StudentId', props.student.id, 1);
      this.student = props.student;
    }
    if (props.enrollmentDate) {
      DateVO.create('Enrollment Date', props.enrollmentDate);
      this.enrollmentDate = props.enrollmentDate;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
