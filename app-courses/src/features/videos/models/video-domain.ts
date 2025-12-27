import { NumberVO } from '../../../core/value-objects';
import { Session } from '../entities';

type VideoEssentials = {
  session: Session;
  videoUrl: string
}

type VideoOptionals = {
  id: number;
}

type VideoProps = VideoEssentials & Partial<VideoOptionals>;
type VideoUpdate = Partial<VideoEssentials>;

export class Video {
  private readonly id: number;
  private session: Session;
  private videoUrl: string;
  private deletedAt: Date | undefined;

  constructor(props: VideoProps) {
    NumberVO.create('SessionId', props.session.id, 1);

    if (props.id) {
      this.id = props.id;
    }
    this.session = props.session;
    this.videoUrl = props.videoUrl;
  }

  properties() {
    return {
      id: this.id,
      session: this.session,
      videoUrl: this.videoUrl,
      deletedAt: this.deletedAt,
    };
  }

  update(props: VideoUpdate) {
    if (props.session) {
      NumberVO.create('SessionId', props.session.id, 1);
      this.session = props.session;
    }
    if (props.videoUrl) {
      this.videoUrl = props.videoUrl;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
