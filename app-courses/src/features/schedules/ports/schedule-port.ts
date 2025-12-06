import { Schedule } from '../models';

export interface SchedulePort {
  save(schedule: Schedule): void;
  getAll(): Schedule[];
  getOne(scheduleId: number): Schedule | null;
  getByPage(page: number): Schedule[];
  update(scheduleId: number, schedule: Schedule): void;
  delete(scheduleId: number): void;
}
