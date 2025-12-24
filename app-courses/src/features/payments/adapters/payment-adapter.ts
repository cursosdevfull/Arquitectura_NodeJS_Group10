import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { Payment } from '../models';
import { PaymentPort } from '../ports';
import { Repository } from 'typeorm';

export class PaymentAdapter extends AdapterBase<Payment> implements PaymentPort {
    constructor(@Inject("PAYMENT_REPOSITORY") protected repository: Repository<Payment>) {
        super(repository);
    }
}
