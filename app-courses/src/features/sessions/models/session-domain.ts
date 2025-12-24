import { NumberVO, DateVO, LengthVO } from '../../../core/value-objects';
import { Schedule } from '../entities';

type SessionEssentials = {
  schedule: Schedule;
  sessionDate: Date;
  hours: string;
}

type SessionOptional = {
  id: number;
}
type SessionProps = SessionEssentials & Partial<SessionOptional>;
type SessionUpdate = Partial<SessionEssentials>;

export class Session {
  private readonly id: number;
  private schedule: Schedule;
  private sessionDate: Date;
  private hours: string;
  private deletedAt: Date | undefined;

  constructor(props: SessionProps) {
    const dateVO = DateVO.create('Session Date', props.sessionDate);
    const hoursVO = LengthVO.create('Hours', props.hours, 10);
    NumberVO.create('ScheduleId', props.schedule.id, 1);

    if (props.id) {
      this.id = props.id;
    }
    this.schedule = props.schedule;
    this.sessionDate = dateVO.value;
    this.hours = hoursVO.value;
  }

  properties() {
    return {
      id: this.id,
      schedule: this.schedule,
      sessionDate: this.sessionDate,
      hours: this.hours,
      deletedAt: this.deletedAt,
    };
  }

  update(props: SessionUpdate) {
    if (props.schedule) {
      NumberVO.create('ScheduleId', props.schedule.id, 1);
      this.schedule = props.schedule;
    }
    if (props.sessionDate) {
      const dateVO = DateVO.create('Session Date', props.sessionDate);
      this.sessionDate = dateVO.value;
    }
    if (props.hours) {
      const hoursVO = LengthVO.create('Hours', props.hours, 10);
      this.hours = hoursVO.value;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
