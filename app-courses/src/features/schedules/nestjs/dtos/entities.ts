import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class Course {
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

export class Teacher {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    id: number;

    @IsOptional()
    @IsString()
    @MinLength(3)
    name: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    lastname: string;
}
