import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Schedule, Student } from './entities';

export class PaymentUpdateDto {
    @IsOptional()
    @IsNumber()
    @Min(0.01)
    @Type(() => Number)
    amount?: number;

    @IsOptional()
    @IsString()
    @MinLength(3)
    currency?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    note?: string;

    @IsOptional()
    @Type(() => Schedule)
    schedule?: Schedule;

    @IsOptional()
    @Type(() => Student)
    student?: Student;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    paymentDate?: Date;
}