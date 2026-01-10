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
import { SessionApplication } from '../application';
import { Session } from '../models';
import {
    SessionCreateDto,
    SessionUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';
import { AuthenticationGuard } from '../../../core/guards';
import { Permissions } from '../../../core/decorators';
import { AuthorizationGuard } from 'src/core/guards/authorization.guard';

@Controller('session')
export class SessionController {
    constructor(
        @Inject('SessionApplication') private readonly app: SessionApplication,
    ) { }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
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

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get()
    async getAll() {
        return await this.app.getAll(['schedule']);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get('/page')
    async getByPage(@Query() query: PageDto) {
        const { currentPage, limit } = query;
        return await this.app.getByPage(currentPage, limit, ['schedule']);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get(':id')
    async getOne(@Param() params: IdDto) {
        const { id } = params;
        return await this.app.getOne(id, ['schedule']);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Put(':id')
    async update(@Param() params: IdDto, @Body() body: SessionUpdateDto) {
        const { id } = params;

        const session = await this.app.getOne(id, ['schedule']);

        if (!session) return 'Session not found';
        session.update(body);

        await this.app.save(session);
        return 'Session updated';
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Delete(':id')
    async remove(@Param() params: IdDto) {
        const { id } = params;

        const session = await this.app.getOne(id, ['schedule']);
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