import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, MinLength } from 'class-validator';
import { Schedule } from './entities';

export class SessionUpdateDto {
    @IsOptional()
    @Type(() => Schedule)
    schedule?: Schedule;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    sessionDate?: Date;

    @IsOptional()
    @IsString()
    @MinLength(1)
    hours?: string;
}