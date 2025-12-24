import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { Student } from '../models';
import { StudentPort } from '../ports';
import { Repository } from 'typeorm';

export class StudentAdapter extends AdapterBase<Student> implements StudentPort {
    constructor(@Inject("STUDENT_REPOSITORY") protected repository: Repository<Student>) {
        super(repository);
    }
}
