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
import { RoleApplication } from '../application';
import { Role } from '../models';
import {
    RoleCreateDto,
    RoleUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';
import { AuthenticationGuard } from '../../../core/guards';
import { Permissions } from '../../../core/decorators';
import { AuthorizationGuard } from 'src/core/guards/authorization.guard';

@Controller('role')
export class RoleController {
    constructor(
        @Inject('RoleApplication') private readonly app: RoleApplication,
    ) { }

    @Post()
    @HttpCode(200)
    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    async create(
        @Body()
        body: RoleCreateDto,
    ) {
        const role = new Role(body);
        await this.app.save(role);

        return {
            message: 'Role created',
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
    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    async update(@Param() params: IdDto, @Body() body: RoleUpdateDto) {
        const { id } = params;

        const role = await this.app.getOne(id);

        if (!role) return 'Role not found';
        role.update(body);

        await this.app.save(role);
        return 'Role updated';
    }

    @Delete(':id')
    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    async remove(@Param() params: IdDto) {
        const { id } = params;

        const role = await this.app.getOne(id);
        if (!role) {
            return {
                message: 'Role not found'
            };
        }

        role.delete();
        await this.app.save(role);
        return 'Role deleted';
    }
}