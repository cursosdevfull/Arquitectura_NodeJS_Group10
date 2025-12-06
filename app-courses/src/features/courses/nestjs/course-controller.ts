import { Controller, Get, Inject, Param, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { CourseApplication } from '../application';
import { Course } from '../models';

@Controller('course')
export class CourseController {
  constructor(
    @Inject('CourseApplication') private readonly app: CourseApplication,
  ) {}

  @Post()
  create(@Req() request: Request, @Res() response: Response) {
    const { title } = request.body as { title: string };

    try {
      const course = new Course(title);
      this.app.save(course);
      response.status(204).send('Course created');
    } catch (error: unknown) {
      if (error instanceof Error) {
        response.status(500).json({
          message: error.message,
          name: error.message,
        });
        console.log({
          message: error.message,
          name: error.message,
          stack: error.stack,
        });
      } else {
        console.log(error);
        response.status(500).send(error);
      }
    }
  }

  @Get()
  getAll() {
    try {
      return this.app.getAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  }

  @Get(':courseId')
  getOne(@Param() params: { courseId: string }) {
    try {
      const { courseId } = params;
      const result = this.app.getOne(+courseId);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  }
}
