import { IsOptional, IsString, MinLength, IsEmail } from 'class-validator';

export class StudentUpdateDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    lastname?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    nickname?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    country?: string;
}