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
import { UserApplication } from '../application';
import { User } from '../models';
import {
    UserCreateDto,
    UserUpdateDto,
} from './dtos';
import { IdDto, PageDto, ResponseInternalServerError } from '../../../core/dtos';
import { AuthenticationGuard } from '../../../core/guards';
import { Endpoint, Permissions } from '../../../core/decorators';
import { AuthorizationGuard } from 'src/core/guards/authorization.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserCreated } from './dtos/responses/user-created';

@Controller('user')
export class UserController {
    constructor(
        @Inject('UserApplication') private readonly app: UserApplication,
    ) { }

    @Endpoint({
        method: "POST",
        summary: 'Create a new user',
        statusCode: 200,
        permissions: ["Admin"],
        //guards: [AuthenticationGuard, AuthorizationGuard],
        responses: [
            { status: 200, description: 'User created successfully.', type: UserCreated, isArray: false },
            { status: 500, description: 'Internal server error.', type: ResponseInternalServerError, isArray: false }
        ]
    })
    async create(
        @Body()
        body: UserCreateDto,
    ) {
        const user = User.create(body);
        await this.app.save(user);

        return {
            message: 'User created',
        };
    }

    @Get()
    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
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