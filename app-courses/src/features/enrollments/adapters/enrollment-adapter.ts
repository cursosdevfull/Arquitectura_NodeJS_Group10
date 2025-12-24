import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { Enrollment } from '../models';
import { EnrollmentPort } from '../ports';
import { Repository } from 'typeorm';

export class EnrollmentAdapter extends AdapterBase<Enrollment> implements EnrollmentPort {
    constructor(@Inject("ENROLLMENT_REPOSITORY") protected repository: Repository<Enrollment>) {
        super(repository);
    }
}
