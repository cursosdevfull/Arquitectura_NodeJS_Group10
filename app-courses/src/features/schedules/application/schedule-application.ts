import { Inject } from '@nestjs/common';
import { Schedule, ScheduleData } from '../models';
import type { SchedulePort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';
import { ScheduleDto } from './dtos';

export class ScheduleApplication extends ApplicationBase<Schedule, ScheduleData, SchedulePort> {
  constructor(@Inject('ScheduleAdapter') adapter: SchedulePort) {
    super(adapter, ScheduleDto.fromDomainToData, ScheduleDto.fromDataToDomain);
  }
}
