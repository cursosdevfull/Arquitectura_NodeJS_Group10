import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min, MinLength } from 'class-validator';
import { Course, Teacher } from './entities';


export class ScheduleCreateDto {
  @IsNotEmpty()
  @Type(() => Course)
  course: Course;

  @IsNotEmpty()
  @Type(() => Teacher)
  teacher: Teacher;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  duration: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  resume: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @MinLength(3, { each: true })
  goals: string[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @MinLength(3, { each: true })
  syllabus: string[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @MinLength(3, { each: true })
  requirements: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  frequency: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  rangeHours: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  slogan: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string;
}
