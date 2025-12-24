import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsString, IsUrl, MinLength } from 'class-validator';

export class TeacherCreateDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    phone: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    linkedIn: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    summary: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    photoUrl: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @MinLength(2, { each: true })
    skills: string[];
}