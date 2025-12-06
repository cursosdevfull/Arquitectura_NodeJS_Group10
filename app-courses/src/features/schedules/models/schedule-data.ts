export class ScheduleData {
  scheduleId: number;
  courseId: number;
  teacherId: number;
  imageUrl: string;
  duration: number;
  resume: string;
  goals: string[];
  syllabus: string[];
  requirements: string[];
  frequency: string;
  start: Date;
  rangeHours: string;
  slogan: string;
  title: string;
  deletedAt: Date | undefined;
}
