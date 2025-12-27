import { Inject } from '@nestjs/common';
import { Enrollment, EnrollmentData } from '../models';
import type { EnrollmentPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';
import { EnrollmentDto } from './dtos';

export class EnrollmentApplication extends ApplicationBase<Enrollment, EnrollmentData, EnrollmentPort> {
  constructor(@Inject('EnrollmentAdapter') adapter: EnrollmentPort) {
    super(adapter, EnrollmentDto.fromDomainToData, EnrollmentDto.fromDataToDomain);
  }
}
