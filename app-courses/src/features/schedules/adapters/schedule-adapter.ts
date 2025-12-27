import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { ScheduleData } from '../models';
import { SchedulePort } from '../ports';
import { Repository } from 'typeorm';

export class ScheduleAdapter extends AdapterBase<ScheduleData> implements SchedulePort {
    constructor(@Inject("SCHEDULE_REPOSITORY") protected repository: Repository<ScheduleData>) {
        super(repository);
    }
}
