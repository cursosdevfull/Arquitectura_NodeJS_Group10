import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';

export class StudentCreateDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    nickname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    country: string;
}