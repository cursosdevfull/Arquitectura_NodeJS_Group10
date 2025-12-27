import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { Schedule, Student } from './entities';

export class CertificateCreateDto {
    @IsNotEmpty()
    @Type(() => Schedule)
    schedule: Schedule;

    @IsNotEmpty()
    @Type(() => Student)
    student: Student;

    @IsNotEmpty()
    @IsDateString()
    dateEmission: string;

    @IsNotEmpty()
    @IsString()
    key: string;
}