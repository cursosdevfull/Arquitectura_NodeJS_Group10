import { Payment } from '../models';
import { PaymentPort } from '../ports';

export class PaymentAdapter implements PaymentPort {
  private payments: Payment[] = [];

  save(payment: Payment): void {
    this.payments.push(payment);
  }

  getAll(): Payment[] {
    return this.payments;
  }

  getOne(paymentId: number): Payment | null {
    const payment = this.payments.find(
      (p) => p.properties().paymentId === paymentId,
    );
    return payment || null;
  }

  getByPage(page: number): Payment[] {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.payments.slice(startIndex, endIndex);
  }

  update(paymentId: number, payment: Payment): void {
    const index = this.payments.findIndex(
      (p) => p.properties().paymentId === paymentId,
    );
    if (index !== -1) {
      this.payments[index] = payment;
    }
  }

  delete(paymentId: number): void {
    const index = this.payments.findIndex(
      (p) => p.properties().paymentId === paymentId,
    );
    if (index !== -1) {
      this.payments.splice(index, 1);
    }
  }
}
