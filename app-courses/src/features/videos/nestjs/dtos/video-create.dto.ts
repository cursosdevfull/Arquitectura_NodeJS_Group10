import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Session } from './entities';

export class VideoCreateDto {
    @IsNotEmpty()
    @Type(() => Session)
    session: Session;
}