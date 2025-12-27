import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { EnrollmentData } from '../models';
import { EnrollmentPort } from '../ports';
import { Repository } from 'typeorm';

export class EnrollmentAdapter extends AdapterBase<EnrollmentData> implements EnrollmentPort {
    constructor(@Inject("ENROLLMENT_REPOSITORY") protected repository: Repository<EnrollmentData>) {
        super(repository);
    }
}
