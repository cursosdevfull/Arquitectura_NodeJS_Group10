import { VideoAdapter } from '../adapters';
import { Video } from '../models';
import { VideoPort } from '../ports';

export class VideoApplication {
  private readonly adapter: VideoPort;

  constructor() {
    this.adapter = new VideoAdapter();
  }

  save(video: Video) {
    this.adapter.save(video);
  }

  getAll() {
    return this.adapter.getAll();
  }

  getOne(videoId: number) {
    return this.adapter.getOne(videoId);
  }

  getByPage(page: number) {
    return this.adapter.getByPage(page);
  }

  update(videoId: number, video: Video) {
    this.adapter.update(videoId, video);
  }

  delete(videoId: number) {
    this.adapter.delete(videoId);
  }
}
