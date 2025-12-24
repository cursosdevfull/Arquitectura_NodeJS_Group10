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
import { EnrollmentApplication } from '../application';
import { Enrollment } from '../models';
import {
    EnrollmentCreateDto,
    EnrollmentUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';

@Controller('enrollment')
export class EnrollmentController {
    constructor(
        @Inject('EnrollmentApplication') private readonly app: EnrollmentApplication,
    ) { }

    @Post()
    @HttpCode(200)
    async create(
        @Body()
        body: EnrollmentCreateDto,
    ) {
        const enrollment = new Enrollment(body);
        await this.app.save(enrollment);

        return {
            message: 'Enrollment created',
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
    async update(@Param() params: IdDto, @Body() body: EnrollmentUpdateDto) {
        const { id } = params;

        const enrollment = await this.app.getOne(id);

        if (!enrollment) return 'Enrollment not found';
        enrollment.update(body);

        await this.app.save(enrollment);
        return 'Enrollment updated';
    }

    @Delete(':id')
    async remove(@Param() params: IdDto) {
        const { id } = params;

        const enrollment = await this.app.getOne(id);
        if (!enrollment) {
            return {
                message: 'Enrollment not found'
            };
        }

        enrollment.delete();
        await this.app.save(enrollment);
        return 'Enrollment deleted';
    }
}