import { LengthVO } from '../../../core/value-objects';

type CourseEssentials = {
  title: string;
}

type CourseOptionals = {
  id: number;
  deletedAt: Date
}

type CourseProps = CourseEssentials & Partial<CourseOptionals>;
type CourseUpdate = Partial<CourseEssentials>;


export class Course {
  private readonly id: number;
  private title: string;
  private deletedAt: Date | undefined;

  constructor(props: CourseProps) {
    const titleVO = LengthVO.create('Title', props.title, 3);

    if (props.id) {
      this.id = props.id;
    }

    if (props.deletedAt) {
      this.deletedAt = props.deletedAt;
    }

    this.title = titleVO.value;
  }

  properties() {
    return {
      id: this.id,
      title: this.title,
      deletedAt: this.deletedAt,
    };
  }

  update(props: CourseUpdate) {
    if (props.title) {
      const titleVO = LengthVO.create('Title', props.title, 3);
      this.title = titleVO.value;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
