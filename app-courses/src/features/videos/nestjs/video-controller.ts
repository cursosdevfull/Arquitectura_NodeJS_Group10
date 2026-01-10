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
import { VideoApplication } from '../application';
import { Video } from '../models';
import {
    VideoCreateDto,
    VideoUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';
import { AuthenticationGuard } from '../../../core/guards';
import { Permissions } from '../../../core/decorators';
import { AuthorizationGuard } from 'src/core/guards/authorization.guard';

@Controller('video')
export class VideoController {
    constructor(
        @Inject('VideoApplication') private readonly app: VideoApplication,
    ) { }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Post()
    @HttpCode(200)
    async create(
        @Body()
        body: VideoCreateDto,
    ) {
        const video = new Video(body);
        await this.app.save(video);

        return {
            message: 'Video created',
        };
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get()
    async getAll() {
        return await this.app.getAll(["session"]);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get('/page')
    async getByPage(@Query() query: PageDto) {
        const { currentPage, limit } = query;
        return await this.app.getByPage(currentPage, limit, ["session"]);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get(':id')
    async getOne(@Param() params: IdDto) {
        const { id } = params;
        return await this.app.getOne(id, ["session"]);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Put(':id')
    @HttpCode(200)
    async update(@Param() params: IdDto, @Body() body: VideoUpdateDto) {
        const { id } = params;

        const video = await this.app.getOne(id, ["session"]);

        if (!video) {
            return {
                message: 'Video not found'
            };
        }

        video.update(body);
        await this.app.save(video);

        return {
            message: 'Video updated'
        };
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Delete(':id')
    @HttpCode(200)
    async remove(@Param() params: IdDto) {
        const { id } = params;

        const video = await this.app.getOne(id, ["session"]);
        if (!video) {
            return {
                message: 'Video not found'
            };
        }

        video.delete();
        await this.app.save(video);

        return {
            message: 'Video deleted'
        };
    }
}