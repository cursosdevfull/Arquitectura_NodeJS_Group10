import { IsNotEmpty, IsString, MinLength } from 'class-validator';

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
    @IsString()
    @MinLength(2)
    country: string;
}