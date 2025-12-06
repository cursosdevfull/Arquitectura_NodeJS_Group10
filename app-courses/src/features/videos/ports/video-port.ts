import { Video } from '../models';

export interface VideoPort {
  save(video: Video): void;
  getAll(): Video[];
  getOne(videoId: number): Video | null;
  getByPage(page: number): Video[];
  update(videoId: number, video: Video): void;
  delete(videoId: number): void;
}
