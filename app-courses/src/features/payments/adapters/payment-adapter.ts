import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { PaymentData } from '../models';
import { PaymentPort } from '../ports';
import { Repository } from 'typeorm';

export class PaymentAdapter extends AdapterBase<PaymentData> implements PaymentPort {
    constructor(@Inject("PAYMENT_REPOSITORY") protected repository: Repository<PaymentData>) {
        super(repository);
    }
}
