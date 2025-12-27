import { NumberVO, DateVO, LengthVO } from '../../../core/value-objects';
import { Schedule, Student } from '../entities';

type CertificateEssentials = {
  schedule: Schedule,
  student: Student,
  dateEmission: Date,
}

type CertificateOptionals = {
  id: number,
  key: string,
  deletedAt: Date
}

type CertificateProps = CertificateEssentials & Partial<CertificateOptionals>;
type CertificateUpdated = Partial<CertificateEssentials>

export class Certificate {
  private readonly id: number;
  private schedule: Schedule;
  private student: Student;
  private dateEmission: Date;
  private key: string;
  private deletedAt: Date | undefined;

  constructor(
    props: CertificateProps
  ) {
    NumberVO.create('ScheduleId', props.schedule.id, 1);
    NumberVO.create('StudentId', props.student.id, 1);
    const dateEmissionVO = DateVO.create('Date', props.dateEmission);

    if (props.key) {
      const keyVO = LengthVO.create('Key', props.key, 10);
      this.key = keyVO.value;
    }

    if (props.id) {
      this.id = props.id;
    }

    if (props.deletedAt) {
      this.deletedAt = props.deletedAt;
    }

    this.schedule = props.schedule;
    this.student = props.student;
    this.dateEmission = dateEmissionVO.value;
  }

  properties() {
    return {
      id: this.id,
      schedule: this.schedule,
      student: this.student,
      dateEmission: this.dateEmission,
      key: this.key,
      deletedAt: this.deletedAt,
    };
  }

  update(props: CertificateUpdated) {
    if (props.schedule) {
      NumberVO.create('ScheduleId', props.schedule.id, 1);
      this.schedule = props.schedule;
    }
    if (props.student) {
      NumberVO.create('StudentId', props.student.id, 1);
      this.student = props.student;
    }
    if (props.dateEmission) {
      const dateEmissionVO = DateVO.create('Date', props.dateEmission);
      this.dateEmission = dateEmissionVO.value;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
