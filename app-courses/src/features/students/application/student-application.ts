import { Inject } from '@nestjs/common';
import { Student } from '../models';
import type { StudentPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';

export class StudentApplication extends ApplicationBase<Student, StudentPort> {
  constructor(@Inject('StudentAdapter') adapter: StudentPort) {
    super(adapter);
  }
}
