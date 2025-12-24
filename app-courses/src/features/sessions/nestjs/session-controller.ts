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
import { SessionApplication } from '../application';
import { Session } from '../models';
import {
    SessionCreateDto,
    SessionUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';

@Controller('session')
export class SessionController {
    constructor(
        @Inject('SessionApplication') private readonly app: SessionApplication,
    ) { }

    @Post()
    @HttpCode(200)
    async create(
        @Body()
        body: SessionCreateDto,
    ) {
        const session = new Session(body);
        await this.app.save(session);

        return {
            message: 'Session created',
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
    async update(@Param() params: IdDto, @Body() body: SessionUpdateDto) {
        const { id } = params;

        const session = await this.app.getOne(id);

        if (!session) return 'Session not found';
        session.update(body);

        await this.app.save(session);
        return 'Session updated';
    }

    @Delete(':id')
    async remove(@Param() params: IdDto) {
        const { id } = params;

        const session = await this.app.getOne(id);
        if (!session) {
            return {
                message: 'Session not found'
            };
        }

        session.delete();
        await this.app.save(session);
        return 'Session deleted';
    }
}