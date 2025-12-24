import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { Schedule } from '../models';
import { SchedulePort } from '../ports';
import { Repository } from 'typeorm';

export class ScheduleAdapter extends AdapterBase<Schedule> implements SchedulePort {
    constructor(@Inject("SCHEDULE_REPOSITORY") protected repository: Repository<Schedule>) {
        super(repository);
    }
}
