import { Inject } from '@nestjs/common';
import { Payment } from '../models';
import type { PaymentPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';

export class PaymentApplication extends ApplicationBase<Payment, PaymentPort> {
  constructor(@Inject('PaymentAdapter') adapter: PaymentPort) {
    super(adapter);
  }
}
