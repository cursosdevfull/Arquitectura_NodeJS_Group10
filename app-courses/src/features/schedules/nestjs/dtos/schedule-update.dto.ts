import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDate, IsNumber, IsOptional, IsString, IsUrl, Min, MinLength } from 'class-validator';
import { Course, Teacher } from './entities';

export class ScheduleUpdateDto {
  @IsOptional()
  @Type(() => Course)
  course: Course;

  @IsOptional()
  @Type(() => Teacher)
  teacher: Teacher;

  @IsOptional()
  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  duration: number;

  @IsOptional()
  @IsString()
  @MinLength(20)
  resume: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @MinLength(3, { each: true })
  goals: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @MinLength(3, { each: true })
  syllabus: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @MinLength(3, { each: true })
  requirements: string[];

  @IsOptional()
  @IsString()
  @MinLength(10)
  frequency: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start: Date;

  @IsOptional()
  @IsString()
  @MinLength(5)
  rangeHours: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  slogan: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  title: string;
}
