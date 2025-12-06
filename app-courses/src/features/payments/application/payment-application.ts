import { PaymentAdapter } from '../adapters';
import { Payment } from '../models';
import { PaymentPort } from '../ports';

export class PaymentApplication {
  private readonly adapter: PaymentPort;

  constructor() {
    this.adapter = new PaymentAdapter();
  }

  save(payment: Payment) {
    this.adapter.save(payment);
  }

  getAll() {
    return this.adapter.getAll();
  }

  getOne(paymentId: number) {
    return this.adapter.getOne(paymentId);
  }

  getByPage(page: number) {
    return this.adapter.getByPage(page);
  }

  update(paymentId: number, payment: Payment) {
    this.adapter.update(paymentId, payment);
  }

  delete(paymentId: number) {
    this.adapter.delete(paymentId);
  }
}
