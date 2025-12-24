import { Inject } from '@nestjs/common';
import { Teacher } from '../models';
import type { TeacherPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';

export class TeacherApplication extends ApplicationBase<Teacher, TeacherPort> {
  constructor(@Inject('TeacherAdapter') adapter: TeacherPort) {
    super(adapter);
  }
}
