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
  UseGuards,
} from '@nestjs/common';
import { CourseApplication } from '../application';
import { Course } from '../models';
import {
  CourseCreateDto,
  CourseUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';
import { AuthenticationGuard } from '../../../core/guards';
import { Permissions } from '../../../core/decorators';
import { AuthorizationGuard } from 'src/core/guards/authorization.guard';

@Controller('course')
export class CourseController {
  constructor(
    @Inject('CourseApplication') private readonly app: CourseApplication,
  ) { }

  @Post()
  @HttpCode(200)
  @Permissions("Admin")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
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
  @Permissions("Admin")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async getAll() {
    return await this.app.getAll();
  }

  @Get('/page')
  @Permissions("Admin")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async getByPage(@Query() query: PageDto) {
    const { currentPage, limit } = query;
    const courses = await this.app.getByPage(currentPage, limit);
    return courses;
  }

  @Get(':id')
  @Permissions("Admin")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async getOne(@Param() params: IdDto) {
    const { id } = params;
    const result = await this.app.getOne(id);
    return result;
  }

  @Put(':id')
  @Permissions("Admin")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async update(@Param() params: IdDto, @Body() body: CourseUpdateDto) {
    const { id } = params;
    const { title } = body;

    const course = await this.app.getOne(id);
    if (!course) return 'Course not found';
    course.update({ title });

    await this.app.save(course);

    return 'Course updated';
  }

  @Delete(':id')
  @Permissions("Admin")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async remove(@Param() params: IdDto) {
    const { id } = params;

    const course = await this.app.getOne(id);
    if (!course) return 'Course not found';
    course.delete();

    await this.app.update(course);

    return 'Course deleted';
  }
}
