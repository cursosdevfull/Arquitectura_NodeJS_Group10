import { LengthVO } from '../../../core/value-objects';

export class Course {
  private readonly courseId: number;
  private title: string;
  private deletedAt: Date | undefined;

  constructor(title: string) {
    const titleVO = LengthVO.create('Title', title, 3);

    this.courseId = Math.floor(Math.random() * 1000);
    this.title = titleVO.value;
  }

  properties() {
    return {
      courseId: this.courseId,
      title: this.title,
      deletedAt: this.deletedAt,
    };
  }
}
