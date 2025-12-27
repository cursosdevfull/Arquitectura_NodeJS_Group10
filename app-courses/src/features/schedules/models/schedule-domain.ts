import {
  ArrayVO,
  LengthVO,
  DateVO,
  ImageVO,
  NumberVO,
} from '../../../core/value-objects';
import { Course, Teacher } from '../entities';

type ScheduleEssentials = {
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
}

type ScheduleOptional = {
  id: number
}

type ScheduleProps = ScheduleEssentials & Partial<ScheduleOptional>;
type ScheduleUpdate = Partial<ScheduleEssentials>;

export class Schedule {
  private readonly id: number;
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
    props: ScheduleProps,
  ) {
    const resumeVO = LengthVO.create('Resume', props.resume, 20);
    const goalsVO = ArrayVO.create('Goals', props.goals, 2);
    const syllabusVO = ArrayVO.create('Syllabus', props.syllabus, 2);
    const requirementsVO = ArrayVO.create('Requirements', props.requirements, 2);
    const frequencyVO = LengthVO.create('Frequency', props.frequency, 10);
    const startVO = DateVO.create('Start Date', props.start);
    const rangeHoursVO = LengthVO.create('Range Hours', props.rangeHours, 5);
    const sloganVO = LengthVO.create('Slogan', props.slogan, 5);
    const titleVO = LengthVO.create('Title', props.title, 5);
    const imageUrlVO = ImageVO.create('ImageUrl', props.imageUrl);
    const durationVO = NumberVO.create('Duration', props.duration, 1);

    if (props.id) {
      this.id = props.id;
    }
    this.course = props.course;
    this.teacher = props.teacher;
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
      id: this.id,
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

  update(props: ScheduleUpdate) {
    if (props.course) this.course = props.course;
    if (props.teacher) this.teacher = props.teacher;
    if (props.imageUrl) {
      const imageUrlVO = ImageVO.create('ImageUrl', props.imageUrl);
      this.imageUrl = imageUrlVO.value;
    }
    if (props.duration) {
      const durationVO = NumberVO.create('Duration', props.duration, 1);
      this.duration = durationVO.value;
    }
    if (props.resume) {
      const resumeVO = LengthVO.create('Resume', props.resume, 20);
      this.resume = resumeVO.value;
    }
    if (props.goals) {
      const goalsVO = ArrayVO.create('Goals', props.goals, 2);
      this.goals = goalsVO.value;
    }
    if (props.syllabus) {
      const syllabusVO = ArrayVO.create('Syllabus', props.syllabus, 2);
      this.syllabus = syllabusVO.value;
    }
    if (props.requirements) {
      const requirementsVO = ArrayVO.create('Requirements', props.requirements, 2);
      this.requirements = requirementsVO.value;
    }
    if (props.frequency) {
      const frequencyVO = LengthVO.create('Frequency', props.frequency, 10);
      this.frequency = frequencyVO.value;
    }
    if (props.start) {
      const startVO = DateVO.create('Start Date', props.start);
      this.start = startVO.value;
    }
    if (props.rangeHours) {
      const rangeHoursVO = LengthVO.create('Range Hours', props.rangeHours, 20);
      this.rangeHours = rangeHoursVO.value;
    }
    if (props.slogan) {
      const sloganVO = LengthVO.create('Slogan', props.slogan, 5);
      this.slogan = sloganVO.value;
    }
    if (props.title) {
      const titleVO = LengthVO.create('Title', props.title, 5);
      this.title = titleVO.value;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
