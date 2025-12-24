import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from './entities';

export class UserUpdateDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Role)
    roles?: Role[];
}