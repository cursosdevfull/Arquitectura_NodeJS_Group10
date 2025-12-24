import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';
import { Schedule, Student } from './entities';

export class PaymentCreateDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0.01)
    @Type(() => Number)
    amount: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    currency: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    note: string;

    @IsNotEmpty()
    @Type(() => Schedule)
    schedule: Schedule;

    @IsNotEmpty()
    @Type(() => Student)
    student: Student;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    paymentDate: Date;
}