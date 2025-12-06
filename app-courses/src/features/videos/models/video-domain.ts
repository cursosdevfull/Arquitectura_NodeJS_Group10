import { NumberVO } from '../../../core/value-objects/number-vo';

export class Video {
  private readonly videoId: number;
  private sessionId: number;
  private deletedAt: Date | undefined;

  constructor(sessionId: number) {
    const sessionVO = NumberVO.create('SessionId', sessionId);

    this.videoId = Math.floor(Math.random() * 1000);
    this.sessionId = sessionVO.value;
  }

  properties() {
    return {
      videoId: this.videoId,
      sessionId: this.sessionId,
      deletedAt: this.deletedAt,
    };
  }
}
