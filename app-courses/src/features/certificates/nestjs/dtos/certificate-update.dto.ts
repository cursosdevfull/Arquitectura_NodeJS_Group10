import { IsOptional, IsDateString } from 'class-validator';
import { Schedule, Student } from './entities';
import { Type } from 'class-transformer';

export class CertificateUpdateDto {
    @IsOptional()
    @IsDateString()
    dateEmission?: string;

    @IsOptional()
    @Type(() => Student)
    student?: Student;

    @IsOptional()
    @Type(() => Schedule)
    schedule?: Schedule;
}