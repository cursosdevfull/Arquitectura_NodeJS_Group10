import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Session } from './entities';

export class VideoUpdateDto {
    @IsOptional()
    @Type(() => Session)
    session?: Session;
}