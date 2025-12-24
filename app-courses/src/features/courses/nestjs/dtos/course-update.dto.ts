import { IsNotEmpty, IsString } from 'class-validator';

export class CourseUpdateDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
