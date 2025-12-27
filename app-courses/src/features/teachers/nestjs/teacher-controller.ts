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
import { TeacherApplication } from '../application';
import { Teacher } from '../models';
import {
    TeacherCreateDto,
    TeacherUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';

@Controller('teacher')
export class TeacherController {
    constructor(
        @Inject('TeacherApplication') private readonly app: TeacherApplication,
    ) { }

    @Post()
    @HttpCode(200)
    async create(
        @Body()
        body: TeacherCreateDto,
    ) {
        console.log("body", body);
        const teacher = new Teacher(body);
        await this.app.save(teacher);

        return {
            message: 'Teacher created',
        };
    }

    @Get()
    async getAll() {
        return await this.app.getAll();
    }

    @Get('/page')
    async getByPage(@Query() query: PageDto) {
        const { currentPage, limit } = query;
        return await this.app.getByPage(currentPage, limit);
    }

    @Get(':id')
    async getOne(@Param() params: IdDto) {
        const { id } = params;
        return await this.app.getOne(id);
    }

    @Put(':id')
    @HttpCode(200)
    async update(@Param() params: IdDto, @Body() body: TeacherUpdateDto) {
        const { id } = params;

        const teacher = await this.app.getOne(id);
        if (!teacher) {
            return {
                message: 'Teacher not found'
            };
        }

        teacher.update(body);
        await this.app.save(teacher);

        return {
            message: 'Teacher updated'
        };
    }

    @Delete(':id')
    @HttpCode(200)
    async remove(@Param() params: IdDto) {
        const { id } = params;

        const teacher = await this.app.getOne(id);
        if (!teacher) {
            return {
                message: 'Teacher not found'
            };
        }

        teacher.delete();
        await this.app.save(teacher);

        return {
            message: 'Teacher deleted'
        };
    }
}