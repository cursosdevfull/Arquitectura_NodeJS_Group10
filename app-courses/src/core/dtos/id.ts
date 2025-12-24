import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class IdDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    id: number;
}
