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
import { UserApplication } from '../application';
import { User } from '../models';
import {
    UserCreateDto,
    UserUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';

@Controller('user')
export class UserController {
    constructor(
        @Inject('UserApplication') private readonly app: UserApplication,
    ) { }

    @Post()
    @HttpCode(200)
    async create(
        @Body()
        body: UserCreateDto,
    ) {
        const user = new User(body);
        await this.app.save(user);

        return {
            message: 'User created',
        };
    }

    @Get()
    async getAll() {
        return await this.app.getAll(["roles"]);
    }

    @Get('/page')
    async getByPage(@Query() query: PageDto) {
        const { currentPage, limit } = query;
        return await this.app.getByPage(currentPage, limit, ["roles"]);
    }

    @Get(':id')
    async getOne(@Param() params: IdDto) {
        const { id } = params;
        return await this.app.getOne(id, ["roles"]);
    }

    @Put(':id')
    @HttpCode(200)
    async update(@Param() params: IdDto, @Body() body: UserUpdateDto) {
        const { id } = params;

        const user = await this.app.getOne(id, ["roles"]);
        if (!user) {
            return {
                message: 'User not found'
            };
        }

        user.update(body);
        await this.app.save(user);

        return {
            message: 'User updated'
        };
    }

    @Delete(':id')
    @HttpCode(200)
    async remove(@Param() params: IdDto) {
        const { id } = params;

        const user = await this.app.getOne(id, ["roles"]);
        if (!user) {
            return {
                message: 'User not found'
            };
        }

        user.delete();
        await this.app.save(user);

        return {
            message: 'User deleted'
        };
    }
}