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
import { TeacherApplication } from '../application';
import { Teacher } from '../models';
import {
    TeacherCreateDto,
    TeacherExpandDto,
    TeacherUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';
import { AuthenticationGuard } from '../../../core/guards';
import { Permissions } from '../../../core/decorators';
import { AuthorizationGuard } from 'src/core/guards/authorization.guard';
import { CreateTeacherCommand } from '../application/commands/create-teacher.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllTeacherQuery } from '../application/queries/get-all-teacher.query';

@Controller('teacher')
export class TeacherController {
    constructor(
        @Inject('TeacherApplication') private readonly app: TeacherApplication,
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) { }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Post()
    @HttpCode(200)
    async create(
        @Body()
        body: TeacherCreateDto,
    ) {
        const teacher = new Teacher(body);

        const command = new CreateTeacherCommand();
        Object.assign(command, teacher.properties());

        await this.commandBus.execute(command);

        //await this.app.save(teacher);

        return {
            message: 'Teacher created',
        };
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get()
    async getAll(@Query() query: TeacherExpandDto) {
        const queryTeacher = new GetAllTeacherQuery();
        if (query.expand) {
            queryTeacher.expand = query.expand;
        }

        return this.queryBus.execute(queryTeacher);
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

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
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