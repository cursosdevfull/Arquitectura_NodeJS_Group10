import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Schedule } from './entities';

export class SessionCreateDto {
    @IsNotEmpty()
    @Type(() => Schedule)
    schedule: Schedule;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    sessionDate: Date;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    hours: string;
}