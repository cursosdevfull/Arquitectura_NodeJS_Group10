import { ScheduleAdapter } from '../adapters';
import { Schedule } from '../models';
import { SchedulePort } from '../ports';

export class ScheduleApplication {
  private readonly adapter: SchedulePort;

  constructor() {
    this.adapter = new ScheduleAdapter();
  }

  save(schedule: Schedule) {
    this.adapter.save(schedule);
  }

  getAll() {
    return this.adapter.getAll();
  }

  getOne(scheduleId: number) {
    return this.adapter.getOne(scheduleId);
  }

  getByPage(page: number) {
    return this.adapter.getByPage(page);
  }

  update(scheduleId: number, schedule: Schedule) {
    this.adapter.update(scheduleId, schedule);
  }

  delete(scheduleId: number) {
    this.adapter.delete(scheduleId);
  }
}
