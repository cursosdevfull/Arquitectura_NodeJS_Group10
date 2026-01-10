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
import { PaymentApplication } from '../application';
import { Payment } from '../models';
import {
    PaymentCreateDto,
    PaymentUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';
import { AuthenticationGuard } from '../../../core/guards';
import { Permissions } from '../../../core/decorators';
import { AuthorizationGuard } from 'src/core/guards/authorization.guard';

@Controller('payment')
export class PaymentController {
    constructor(
        @Inject('PaymentApplication') private readonly app: PaymentApplication,
    ) { }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Post()
    @HttpCode(200)
    async create(
        @Body()
        body: PaymentCreateDto,
    ) {
        const payment = new Payment(body);
        await this.app.save(payment);

        return {
            message: 'Payment created',
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
    async update(@Param() params: IdDto, @Body() body: PaymentUpdateDto) {
        const { id } = params;

        const payment = await this.app.getOne(id, ["student", "schedule"]);

        if (!payment) return 'Payment not found';
        payment.update(body);

        await this.app.save(payment);
        return 'Payment updated';
    }

    @Permissions("Admin")
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Delete(':id')
    async remove(@Param() params: IdDto) {
        const { id } = params;

        const payment = await this.app.getOne(id, ["student", "schedule"]);
        if (!payment) {
            return {
                message: 'Payment not found'
            };
        }

        payment.delete();
        await this.app.save(payment);
        return 'Payment deleted';
    }
}