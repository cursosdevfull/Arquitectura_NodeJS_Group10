import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from './entities';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
    @ApiProperty({
        type: "string",
        description: "The name of the user",
        example: "John Doe",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({
        type: "string",
        description: "The email of the user",
        example: "john.doe@example.com",
        required: true
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: "string",
        description: "The password of the user",
        example: "strongpassword123",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        type: [Role],
        description: "The roles assigned to the user",
        required: true
    })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Role)
    roles: Role[];
}