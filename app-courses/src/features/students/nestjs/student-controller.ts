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
import { StudentApplication } from '../application';
import { Student } from '../models';
import {
    StudentCreateDto,
    StudentUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';
import { AuthenticationGuard } from '../../../core/guards';
import { Permissions } from '../../../core/decorators';
import { AuthorizationGuard } from 'src/core/guards/authorization.guard';

@Controller('student')
export class StudentController {
    constructor(
        @Inject('StudentApplication') private readonly app: StudentApplication,
    ) { }

    @Post()
    @HttpCode(200)
    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    async create(
        @Body()
        body: StudentCreateDto,
    ) {
        const student = new Student(body);
        await this.app.save(student);

        return {
            message: 'Student created',
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
        return await this.app.getByPage(currentPage, limit);
    }

    @Get(':id')
    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    async getOne(@Param() params: IdDto) {
        const { id } = params;
        return await this.app.getOne(id);
    }

    @Put(':id')
    @HttpCode(200)
    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    async update(@Param() params: IdDto, @Body() body: StudentUpdateDto) {
        const { id } = params;

        const student = await this.app.getOne(id);
        if (!student) {
            return {
                message: 'Student not found'
            };
        }

        student.update(body);
        await this.app.save(student);

        return {
            message: 'Student updated'
        };
    }

    @Delete(':id')
    @HttpCode(200)
    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    async remove(@Param() params: IdDto) {
        const { id } = params;

        const student = await this.app.getOne(id);
        if (!student) {
            return {
                message: 'Student not found'
            };
        }

        student.delete();
        await this.app.save(student);

        return {
            message: 'Student deleted'
        };
    }
}