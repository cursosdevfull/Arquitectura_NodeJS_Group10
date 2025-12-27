import { Type } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { Session } from './entities';

export class VideoUpdateDto {
    @IsOptional()
    @Type(() => Session)
    session?: Session;

    @IsOptional()
    @IsString()
    @MinLength(5)
    videoUrl: string
}