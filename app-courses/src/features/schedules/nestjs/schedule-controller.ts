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
import { ScheduleApplication } from '../application';
import { Schedule } from '../models';
import {
    ScheduleCreateDto,
    ScheduleUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';

@Controller('schedule')
export class ScheduleController {
    constructor(
        @Inject('ScheduleApplication') private readonly app: ScheduleApplication,
    ) { }

    @Post()
    @HttpCode(200)
    async create(
        @Body()
        body: ScheduleCreateDto,
    ) {
        const schedule = new Schedule(body);
        await this.app.save(schedule);

        return {
            message: 'Schedule created',
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
    async update(@Param() params: IdDto, @Body() body: ScheduleUpdateDto) {
        const { id } = params;

        const schedule = await this.app.getOne(id);

        if (!schedule) return 'Schedule not found';
        schedule.update(body);

        await this.app.save(schedule);
        return 'Schedule updated';
    }

    @Delete(':id')
    async remove(@Param() params: IdDto) {
        const { id } = params;

        const schedule = await this.app.getOne(id);
        if (!schedule) {
            return {
                message: 'Schedule not found'
            };
        }

        schedule.delete();
        await this.app.save(schedule);
        return 'Schedule deleted';
    }
}
