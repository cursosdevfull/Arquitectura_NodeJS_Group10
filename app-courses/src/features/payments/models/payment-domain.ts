import { NumberVO, DateVO, LengthVO } from '../../../core/value-objects';
import { Schedule, Student } from '../entities';

export class Payment {
  private readonly paymentId: number;
  private amount: number;
  private currency: string;
  private note: string;
  private schedule: Schedule;
  private student: Student;
  private date: Date;
  private deletedAt: Date | undefined;

  constructor(
    amount: number,
    currency: string,
    note: string,
    schedule: Schedule,
    student: Student,
    date: Date,
  ) {
    const currencyVO = LengthVO.create('Currency', currency, 3);
    const amountVO = NumberVO.create('Amount', amount, 1);
    const noteVO = LengthVO.create('Note', note, 3);
    NumberVO.create('ScheduleId', schedule.scheduleId, 1);
    NumberVO.create('StudentId', student.studentId, 1);
    DateVO.create('Date', date);

    this.paymentId = Math.floor(Math.random() * 1000);
    this.amount = amountVO.value;
    this.currency = currencyVO.value;
    this.note = noteVO.value;
    this.schedule = schedule;
    this.student = student;
    this.date = date;
  }

  properties() {
    return {
      paymentId: this.paymentId,
      amount: this.amount,
      currency: this.currency,
      note: this.note,
      schedule: this.schedule,
      student: this.student,
      date: this.date,
      deletedAt: this.deletedAt,
    };
  }
}
