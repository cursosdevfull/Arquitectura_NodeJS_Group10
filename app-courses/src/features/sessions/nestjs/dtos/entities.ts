import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class Schedule {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    id: number;

    @IsOptional()
    @IsString()
    @MinLength(3)
    title: string;
}