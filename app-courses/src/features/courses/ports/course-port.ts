import { PortBase } from 'src/core/generics';
import { CourseData } from '../models';

export interface CoursePort extends PortBase<CourseData> {
  existsCourse(title: string): Promise<boolean>;
}
