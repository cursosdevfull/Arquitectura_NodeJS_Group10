import { Inject } from '@nestjs/common';
import { Teacher, TeacherData } from '../models';
import type { TeacherPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';
import { TeacherDto } from './dtos';

export class TeacherApplication extends ApplicationBase<Teacher, TeacherData, TeacherPort> {
  constructor(@Inject('TeacherAdapter') adapter: TeacherPort) {
    super(adapter, TeacherDto.fromDomainToData, TeacherDto.fromDataToDomain);
  }
}
