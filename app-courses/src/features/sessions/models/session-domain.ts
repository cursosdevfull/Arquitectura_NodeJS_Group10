import { NumberVO } from 'src/core/value-objects/number-vo';
import { DateVO, LengthVO } from '../../../core/value-objects';
import { Schedule } from '../entities';

export class Session {
  private readonly sessionId: number;
  private schedule: Schedule;
  private date: Date;
  private hours: string;
  private deletedAt: Date | undefined;

  constructor(schedule: Schedule, date: Date, hours: string) {
    const dateVO = DateVO.create('Date', date);
    const hoursVO = LengthVO.create('Hours', hours, 10);
    NumberVO.create('ScheduleId', schedule.scheduleId, 1);

    this.sessionId = Math.floor(Math.random() * 1000);
    this.schedule = schedule;
    this.date = dateVO.value;
    this.hours = hoursVO.value;
  }

  properties() {
    return {
      sessionId: this.sessionId,
      schedule: this.schedule,
      date: this.date,
      hours: this.hours,
      deletedAt: this.deletedAt,
    };
  }
}
