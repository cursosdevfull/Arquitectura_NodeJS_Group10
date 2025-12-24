import { IsOptional, IsString, MinLength } from 'class-validator';

export class RoleUpdateDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;
}