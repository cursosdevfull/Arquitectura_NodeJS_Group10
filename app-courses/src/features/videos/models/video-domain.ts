import { NumberVO } from '../../../core/value-objects';
import { Session } from '../entities';

type VideoEssentials = {
  session: Session;
}

type VideoOptionals = {
  id: number;
}

type VideoProps = VideoEssentials & Partial<VideoOptionals>;
type VideoUpdate = Partial<VideoEssentials>;

export class Video {
  private readonly id: number;
  private session: Session;
  private deletedAt: Date | undefined;

  constructor(props: VideoProps) {
    NumberVO.create('SessionId', props.session.id, 1);

    if (props.id) {
      this.id = props.id;
    }
    this.session = props.session;
  }

  properties() {
    return {
      id: this.id,
      session: this.session,
      deletedAt: this.deletedAt,
    };
  }

  update(props: VideoUpdate) {
    if (props.session) {
      NumberVO.create('SessionId', props.session.id, 1);
      this.session = props.session;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
