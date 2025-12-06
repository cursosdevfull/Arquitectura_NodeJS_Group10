import { Schedule } from '../models';
import { SchedulePort } from '../ports';

export class ScheduleAdapter implements SchedulePort {
  private schedules: Schedule[] = [];

  save(schedule: Schedule): void {
    this.schedules.push(schedule);
  }

  getAll(): Schedule[] {
    return this.schedules;
  }

  getOne(scheduleId: number): Schedule | null {
    const schedule = this.schedules.find(
      (s) => s.properties().scheduleId === scheduleId,
    );
    return schedule || null;
  }

  getByPage(page: number): Schedule[] {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.schedules.slice(startIndex, endIndex);
  }

  update(scheduleId: number, schedule: Schedule): void {
    const index = this.schedules.findIndex(
      (s) => s.properties().scheduleId === scheduleId,
    );
    if (index !== -1) {
      this.schedules[index] = schedule;
    }
  }

  delete(scheduleId: number): void {
    const index = this.schedules.findIndex(
      (s) => s.properties().scheduleId === scheduleId,
    );
    if (index !== -1) {
      this.schedules.splice(index, 1);
    }
  }
}
