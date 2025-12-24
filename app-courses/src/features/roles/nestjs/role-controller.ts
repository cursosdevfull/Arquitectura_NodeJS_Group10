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
import { RoleApplication } from '../application';
import { Role } from '../models';
import {
    RoleCreateDto,
    RoleUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';

@Controller('role')
export class RoleController {
    constructor(
        @Inject('RoleApplication') private readonly app: RoleApplication,
    ) { }

    @Post()
    @HttpCode(200)
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
    async update(@Param() params: IdDto, @Body() body: RoleUpdateDto) {
        const { id } = params;

        const role = await this.app.getOne(id);

        if (!role) return 'Role not found';
        role.update(body);

        await this.app.save(role);
        return 'Role updated';
    }

    @Delete(':id')
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