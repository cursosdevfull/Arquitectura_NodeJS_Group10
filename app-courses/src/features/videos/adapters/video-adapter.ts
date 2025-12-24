import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { Video } from '../models';
import { VideoPort } from '../ports';
import { Repository } from 'typeorm';

export class VideoAdapter extends AdapterBase<Video> implements VideoPort {
    constructor(@Inject("VIDEO_REPOSITORY") protected repository: Repository<Video>) {
        super(repository);
    }
}
