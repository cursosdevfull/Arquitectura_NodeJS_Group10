import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class Role {
    @ApiProperty(
        {
            type: "number",
            description: "The unique identifier of the role",
            example: 1,
            required: true
        }
    )
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    id: number;

    @ApiProperty({
        type: "string",
        description: "The name of the role",
        example: "Admin",
        required: false
    })
    @IsOptional()
    @IsString()
    @MinLength(3)
    name: string;
}