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
import { EnrollmentApplication } from '../application';
import { Enrollment } from '../models';
import {
    EnrollmentCreateDto,
    EnrollmentUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';
import { AuthenticationGuard } from '../../../core/guards';
import { Permissions } from '../../../core/decorators';
import { AuthorizationGuard } from 'src/core/guards/authorization.guard';

@Controller('enrollment')
export class EnrollmentController {
    constructor(
        @Inject('EnrollmentApplication') private readonly app: EnrollmentApplication,
    ) { }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
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

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get()
    async getAll() {
        return await this.app.getAll(["student", "schedule"]);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get('/page')
    async getByPage(@Query() query: PageDto) {
        const { currentPage, limit } = query;
        return await this.app.getByPage(currentPage, limit, ["student", "schedule"]);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Get(':id')
    async getOne(@Param() params: IdDto) {
        const { id } = params;
        return await this.app.getOne(id, ["student", "schedule"]);
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Put(':id')
    async update(@Param() params: IdDto, @Body() body: EnrollmentUpdateDto) {
        const { id } = params;

        const enrollment = await this.app.getOne(id, ["student", "schedule"]);

        if (!enrollment) return 'Enrollment not found';
        enrollment.update(body);

        await this.app.save(enrollment);
        return 'Enrollment updated';
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Delete(':id')
    async remove(@Param() params: IdDto) {
        const { id } = params;

        const enrollment = await this.app.getOne(id, ["student", "schedule"]);
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