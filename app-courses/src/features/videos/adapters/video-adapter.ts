import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { VideoData } from '../models';
import { VideoPort } from '../ports';
import { Repository } from 'typeorm';

export class VideoAdapter extends AdapterBase<VideoData> implements VideoPort {
    constructor(@Inject("VIDEO_REPOSITORY") protected repository: Repository<VideoData>) {
        super(repository);
    }
}
