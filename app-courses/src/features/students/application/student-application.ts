import { Inject } from '@nestjs/common';
import { Student, StudentData } from '../models';
import type { StudentPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';
import { StudentDto } from './dtos';
import { CustomErrorApplication } from '../../../core/errors';
import { EventPublisher } from '@nestjs/cqrs';

export class StudentApplication extends ApplicationBase<Student, StudentData, StudentPort> {
  constructor(@Inject('StudentAdapter') adapter: StudentPort, private publisher: EventPublisher) {
    super(adapter, StudentDto.fromDomainToData, StudentDto.fromDataToDomain);
  }

  async save(student: Student): Promise<void> {
    const email = student.properties().email;
    const existingStudent = await this.adapter.findByEmail(email);

    if (existingStudent && existingStudent.id !== student.properties().id) {
      throw new CustomErrorApplication('Email already exists', 'DUPLICATE_EMAIL');
    }

    await super.save(student);

    const studentAggregate = this.publisher.mergeObjectContext(student);
    studentAggregate.commit();
  }

  async validateEmailUniqueness(email: string, excludeId?: number): Promise<boolean> {
    const existingStudent = await this.adapter.findByEmail(email);
    return !existingStudent || existingStudent.id === excludeId;
  }

}
