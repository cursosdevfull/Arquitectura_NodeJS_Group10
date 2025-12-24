import { Inject } from '@nestjs/common';
import { Enrollment } from '../models';
import type { EnrollmentPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';

export class EnrollmentApplication extends ApplicationBase<Enrollment, EnrollmentPort> {
  constructor(@Inject('EnrollmentAdapter') adapter: EnrollmentPort) {
    super(adapter);
  }
}
