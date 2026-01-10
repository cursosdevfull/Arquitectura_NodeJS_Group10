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
import { ScheduleApplication } from '../application';
import { Schedule } from '../models';
import {
    ScheduleCreateDto,
    ScheduleUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';
import { AuthenticationGuard } from '../../../core/guards';
import { Permissions } from '../../../core/decorators';
import { AuthorizationGuard } from 'src/core/guards/authorization.guard';
import { ScheduleExpandDto } from './dtos/schedule-expand.dto';

@Controller('schedule')
export class ScheduleController {
    constructor(
        @Inject('ScheduleApplication') private readonly app: ScheduleApplication,
    ) { }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
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

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get()
    async getAll(@Query() query: ScheduleExpandDto) {
        return await this.app.getAll(query.expand);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get('/page')
    async getByPage(@Query() query: PageDto) {
        const { currentPage, limit } = query;
        return await this.app.getByPage(currentPage, limit);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get(':id')
    async getOne(@Param() params: IdDto) {
        const { id } = params;
        return await this.app.getOne(id);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Put(':id')
    async update(@Param() params: IdDto, @Body() body: ScheduleUpdateDto) {
        const { id } = params;

        const schedule = await this.app.getOne(id);

        if (!schedule) return 'Schedule not found';
        schedule.update(body);

        await this.app.save(schedule);
        return 'Schedule updated';
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
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
