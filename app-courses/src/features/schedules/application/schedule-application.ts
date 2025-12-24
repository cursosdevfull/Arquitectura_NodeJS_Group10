import { Inject } from '@nestjs/common';
import { Schedule } from '../models';
import type { SchedulePort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';

export class ScheduleApplication extends ApplicationBase<Schedule, SchedulePort> {
  constructor(@Inject('ScheduleAdapter') adapter: SchedulePort) {
    super(adapter);
  }
}
