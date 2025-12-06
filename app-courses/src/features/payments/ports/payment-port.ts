import { Payment } from '../models';

export interface PaymentPort {
  save(payment: Payment): void;
  getAll(): Payment[];
  getOne(paymentId: number): Payment | null;
  getByPage(page: number): Payment[];
  update(paymentId: number, payment: Payment): void;
  delete(paymentId: number): void;
}
