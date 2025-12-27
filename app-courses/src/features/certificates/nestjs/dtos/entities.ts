import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min, IsOptional, IsString, MinLength } from "class-validator";

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

export class Student {
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