import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RoleCreateDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;
}