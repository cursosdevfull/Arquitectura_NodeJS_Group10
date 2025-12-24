import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Schedule, Student } from './entities';

export class EnrollmentCreateDto {
    @IsNotEmpty()
    @Type(() => Schedule)
    schedule: Schedule;

    @IsNotEmpty()
    @Type(() => Student)
    student: Student;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    enrollmentDate: Date;
}