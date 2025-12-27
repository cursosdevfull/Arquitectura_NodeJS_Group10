import { Inject } from '@nestjs/common';
import { Video, VideoData } from '../models';
import type { VideoPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';
import { VideoDto } from './dtos';

export class VideoApplication extends ApplicationBase<Video, VideoData, VideoPort> {
  constructor(@Inject('VideoAdapter') adapter: VideoPort) {
    super(adapter, VideoDto.fromDomainToData, VideoDto.fromDataToDomain);
  }
}
