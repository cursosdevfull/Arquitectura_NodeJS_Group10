import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CourseApplication } from '../application';
import { Course } from '../models';
import {
  CourseCreateDto,
  CourseUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';

@Controller('course')
export class CourseController {
  constructor(
    @Inject('CourseApplication') private readonly app: CourseApplication,
  ) { }

  @Post()
  @HttpCode(200)
  async create(
    @Body()
    body: CourseCreateDto,
  ) {
    const { title } = body;

    const course = new Course({ title });
    await this.app.save(course);

    return {
      message: 'Course created',
    };
  }


  @Get()
  async getAll() {
    return await this.app.getAll();
  }

  @Get('/page')
  async getByPage(@Query() query: PageDto) {
    const { currentPage, limit } = query;
    const courses = await this.app.getByPage(currentPage, limit);
    return courses;
  }

  @Get(':id')
  async getOne(@Param() params: IdDto) {
    const { id } = params;
    const result = await this.app.getOne(id);
    return result;
  }

  @Put(':id')
  async update(@Param() params: IdDto, @Body() body: CourseUpdateDto) {
    const { id } = params;
    const { title } = body;

    const course = await this.app.getOne(id);
    if (!course) return 'Course not found';
    console.log(course)
    course.update({ title });

    await this.app.save(course);

    return 'Course updated';
  }

  @Delete(':id')
  async remove(@Param() params: IdDto) {
    const { id } = params;

    const course = await this.app.getOne(id);
    if (!course) return 'Course not found';
    course.delete();

    await this.app.save(course);

    return 'Course deleted';
  }
}
