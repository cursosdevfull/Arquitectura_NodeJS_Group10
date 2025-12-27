import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Session } from './entities';

export class VideoCreateDto {
    @IsNotEmpty()
    @Type(() => Session)
    session: Session;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    videoUrl: string
}