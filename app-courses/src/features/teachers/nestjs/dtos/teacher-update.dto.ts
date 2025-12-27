import { ArrayMinSize, IsArray, IsEmail, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class TeacherUpdateDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    lastname?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(7)
    phone?: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    linkedIn?: string;

    @IsOptional()
    @IsString()
    @MinLength(10)
    summary?: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    photoUrl?: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @MinLength(2, { each: true })
    skills?: string[];
}