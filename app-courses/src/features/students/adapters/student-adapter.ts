import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { StudentData } from '../models';
import { StudentPort } from '../ports';
import { Repository } from 'typeorm';

export class StudentAdapter extends AdapterBase<StudentData> implements StudentPort {
    constructor(@Inject("STUDENT_REPOSITORY") protected repository: Repository<StudentData>) {
        super(repository);
    }
}
