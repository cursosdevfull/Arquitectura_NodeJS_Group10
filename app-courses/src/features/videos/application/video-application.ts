import { Inject } from '@nestjs/common';
import { Video } from '../models';
import type { VideoPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';

export class VideoApplication extends ApplicationBase<Video, VideoPort> {
  constructor(@Inject('VideoAdapter') adapter: VideoPort) {
    super(adapter);
  }
}
