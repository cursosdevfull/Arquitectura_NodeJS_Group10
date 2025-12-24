import { IsNotEmpty, IsString } from 'class-validator';

export class CourseCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
