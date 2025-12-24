import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from './entities';

export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Role)
    roles: Role[];
}