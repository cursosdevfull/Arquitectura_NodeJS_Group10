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
import { PaymentApplication } from '../application';
import { Payment } from '../models';
import {
    PaymentCreateDto,
    PaymentUpdateDto,
} from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';

@Controller('payment')
export class PaymentController {
    constructor(
        @Inject('PaymentApplication') private readonly app: PaymentApplication,
    ) { }

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

    @Get()
    async getAll() {
        return await this.app.getAll(["student", "schedule"]);
    }

    @Get('/page')
    async getByPage(@Query() query: PageDto) {
        const { currentPage, limit } = query;
        return await this.app.getByPage(currentPage, limit, ["student", "schedule"]);
    }

    @Get(':id')
    async getOne(@Param() params: IdDto) {
        const { id } = params;
        return await this.app.getOne(id, ["student", "schedule"]);
    }

    @Put(':id')
    async update(@Param() params: IdDto, @Body() body: PaymentUpdateDto) {
        const { id } = params;

        const payment = await this.app.getOne(id, ["student", "schedule"]);

        if (!payment) return 'Payment not found';
        payment.update(body);

        await this.app.save(payment);
        return 'Payment updated';
    }

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