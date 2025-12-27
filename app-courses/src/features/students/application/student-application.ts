import { Inject } from '@nestjs/common';
import { Student, StudentData } from '../models';
import type { StudentPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';
import { StudentDto } from './dtos';

export class StudentApplication extends ApplicationBase<Student, StudentData, StudentPort> {
  constructor(@Inject('StudentAdapter') adapter: StudentPort) {
    super(adapter, StudentDto.fromDomainToData, StudentDto.fromDataToDomain);
  }
}
