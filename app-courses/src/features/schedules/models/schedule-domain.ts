import {
  ArrayVO,
  LengthVO,
  DateVO,
  ImageVO,
  NumberVO,
} from '../../../core/value-objects';
import { Course, Teacher } from '../entities';

export class Schedule {
  private readonly scheduleId: number;
  private course: Course;
  private teacher: Teacher;
  private imageUrl: string;
  private duration: number;
  private resume: string;
  private goals: string[];
  private syllabus: string[];
  private requirements: string[];
  private frequency: string;
  private start: Date;
  private rangeHours: string;
  private slogan: string;
  private title: string;
  private deletedAt: Date | undefined;

  constructor(
    course: Course,
    teacher: Teacher,
    imageUrl: string,
    duration: number,
    resume: string,
    goals: string[],
    syllabus: string[],
    requirements: string[],
    frequency: string,
    start: Date,
    rangeHours: string,
    slogan: string,
    title: string,
  ) {
    const resumeVO = LengthVO.create('Resume', resume, 20);
    const goalsVO = ArrayVO.create('Goals', goals, 2);
    const syllabusVO = ArrayVO.create('Syllabus', syllabus, 2);
    const requirementsVO = ArrayVO.create('Requirements', requirements, 2);
    const frequencyVO = LengthVO.create('Frequency', frequency, 10);
    const startVO = DateVO.create('Start Date', start);
    const rangeHoursVO = LengthVO.create('Range Hours', rangeHours, 20);
    const sloganVO = LengthVO.create('Slogan', slogan, 5);
    const titleVO = LengthVO.create('Title', title, 5);
    const imageUrlVO = ImageVO.create('ImageUrl', imageUrl);
    const durationVO = NumberVO.create('Duration', duration, 1);

    this.scheduleId = Math.floor(Math.random() * 1000);
    this.course = course;
    this.teacher = teacher;
    this.imageUrl = imageUrlVO.value;
    this.duration = durationVO.value;
    this.resume = resumeVO.value;
    this.goals = goalsVO.value;
    this.syllabus = syllabusVO.value;
    this.requirements = requirementsVO.value;
    this.frequency = frequencyVO.value;
    this.start = startVO.value;
    this.rangeHours = rangeHoursVO.value;
    this.slogan = sloganVO.value;
    this.title = titleVO.value;
  }

  properties() {
    return {
      scheduleId: this.scheduleId,
      course: this.course,
      teacher: this.teacher,
      imageUrl: this.imageUrl,
      duration: this.duration,
      resume: this.resume,
      goals: this.goals,
      syllabus: this.syllabus,
      requirements: this.requirements,
      frequency: this.frequency,
      start: this.start,
      rangeHours: this.rangeHours,
      slogan: this.slogan,
      title: this.title,
      deletedAt: this.deletedAt,
    };
  }
}
