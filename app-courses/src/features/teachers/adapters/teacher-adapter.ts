import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { TeacherData } from '../models';
import { TeacherPort } from '../ports';
import { Repository } from 'typeorm';

export class TeacherAdapter extends AdapterBase<TeacherData> implements TeacherPort {
    constructor(@Inject("TEACHER_REPOSITORY") protected repository: Repository<TeacherData>) {
        super(repository);
    }
}
