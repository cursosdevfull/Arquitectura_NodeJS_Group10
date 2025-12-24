import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CertificateCreateDto {
    @IsNotEmpty()
    @IsNumber()
    scheduleId: number;

    @IsNotEmpty()
    @IsNumber()
    studentId: number;

    @IsNotEmpty()
    @IsDateString()
    dateEmission: string;

    @IsNotEmpty()
    @IsString()
    key: string;
}