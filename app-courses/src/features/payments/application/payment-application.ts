import { Inject } from '@nestjs/common';
import { Payment, PaymentData } from '../models';
import type { PaymentPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';
import { PaymentDto } from './dtos';

export class PaymentApplication extends ApplicationBase<Payment, PaymentData, PaymentPort> {
  constructor(@Inject('PaymentAdapter') adapter: PaymentPort) {
    super(adapter, PaymentDto.fromDomainToData, PaymentDto.fromDataToDomain);
  }
}
