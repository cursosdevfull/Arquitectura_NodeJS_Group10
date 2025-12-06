export class PaymentData {
  paymentId: number;
  amount: number;
  currency: string;
  note: string;
  scheduleId: number;
  studentId: number;
  date: Date;
  deletedAt: Date | undefined;
}
