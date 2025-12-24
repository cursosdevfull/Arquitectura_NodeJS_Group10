import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { Teacher } from '../models';
import { TeacherPort } from '../ports';
import { Repository } from 'typeorm';

export class TeacherAdapter extends AdapterBase<Teacher> implements TeacherPort {
    constructor(@Inject("TEACHER_REPOSITORY") protected repository: Repository<Teacher>) {
        super(repository);
    }
}
