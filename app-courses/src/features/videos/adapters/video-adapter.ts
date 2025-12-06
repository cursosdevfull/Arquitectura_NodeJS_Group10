import { Video } from '../models';
import { VideoPort } from '../ports';

export class VideoAdapter implements VideoPort {
  private videos: Video[] = [];

  save(video: Video): void {
    this.videos.push(video);
  }

  getAll(): Video[] {
    return this.videos;
  }

  getOne(videoId: number): Video | null {
    const video = this.videos.find((v) => v.properties().videoId === videoId);
    return video || null;
  }

  getByPage(page: number): Video[] {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.videos.slice(startIndex, endIndex);
  }

  update(videoId: number, video: Video): void {
    const index = this.videos.findIndex(
      (v) => v.properties().videoId === videoId,
    );
    if (index !== -1) {
      this.videos[index] = video;
    }
  }

  delete(videoId: number): void {
    const index = this.videos.findIndex(
      (v) => v.properties().videoId === videoId,
    );
    if (index !== -1) {
      this.videos.splice(index, 1);
    }
  }
}
