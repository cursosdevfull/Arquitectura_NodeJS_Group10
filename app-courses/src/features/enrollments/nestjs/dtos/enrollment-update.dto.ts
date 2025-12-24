import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { Schedule, Student } from './entities';

export class EnrollmentUpdateDto {
    @IsOptional()
    @Type(() => Schedule)
    schedule?: Schedule;

    @IsOptional()
    @Type(() => Student)
    student?: Student;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    enrollmentDate?: Date;
}