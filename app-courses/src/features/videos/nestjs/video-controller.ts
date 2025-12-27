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
import { VideoApplication } from '../application';
import { Video } from '../models';
import {
    VideoCreateDto,
    VideoUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';

@Controller('video')
export class VideoController {
    constructor(
        @Inject('VideoApplication') private readonly app: VideoApplication,
    ) { }

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

    @Get()
    async getAll() {
        return await this.app.getAll(["session"]);
    }

    @Get('/page')
    async getByPage(@Query() query: PageDto) {
        const { currentPage, limit } = query;
        return await this.app.getByPage(currentPage, limit, ["session"]);
    }

    @Get(':id')
    async getOne(@Param() params: IdDto) {
        const { id } = params;
        return await this.app.getOne(id, ["session"]);
    }

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