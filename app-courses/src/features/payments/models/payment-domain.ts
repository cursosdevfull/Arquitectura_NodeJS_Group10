import { NumberVO, DateVO, LengthVO } from '../../../core/value-objects';
import { Schedule, Student } from '../entities';

type PaymentEssentials = {
  amount: number;
  currency: string;
  note: string;
  schedule: Schedule;
  student: Student;
  paymentDate: Date;
}

type PaymentOptionals = {
  id: number;
}

type PaymentProps = PaymentEssentials & Partial<PaymentOptionals>;
type PaymentUpdate = Partial<PaymentProps>;

export class Payment {
  private readonly id: number;
  private amount: number;
  private currency: string;
  private note: string;
  private schedule: Schedule;
  private student: Student;
  private paymentDate: Date;
  private deletedAt: Date | undefined;

  constructor(props: PaymentProps) {
    const currencyVO = LengthVO.create('Currency', props.currency, 3);
    const amountVO = NumberVO.create('Amount', props.amount, 1);
    const noteVO = LengthVO.create('Note', props.note, 3);
    NumberVO.create('ScheduleId', props.schedule.id, 1);
    NumberVO.create('StudentId', props.student.id, 1);
    DateVO.create('Payment Date', props.paymentDate);

    if (props.id) {
      this.id = props.id;
    }
    this.amount = amountVO.value;
    this.currency = currencyVO.value;
    this.note = noteVO.value;
    this.schedule = props.schedule;
    this.student = props.student;
    this.paymentDate = props.paymentDate;
  }

  properties() {
    return {
      id: this.id,
      amount: this.amount,
      currency: this.currency,
      note: this.note,
      schedule: this.schedule,
      student: this.student,
      paymentDate: this.paymentDate,
      deletedAt: this.deletedAt,
    };
  }

  update(props: PaymentUpdate) {
    if (props.amount !== undefined) {
      const amountVO = NumberVO.create('Amount', props.amount, 1);
      this.amount = amountVO.value;
    }
    if (props.currency) {
      const currencyVO = LengthVO.create('Currency', props.currency, 3);
      this.currency = currencyVO.value;
    }
    if (props.note) {
      const noteVO = LengthVO.create('Note', props.note, 3);
      this.note = noteVO.value;
    }
    if (props.schedule) {
      NumberVO.create('ScheduleId', props.schedule.id, 1);
      this.schedule = props.schedule;
    }
    if (props.student) {
      NumberVO.create('StudentId', props.student.id, 1);
      this.student = props.student;
    }
    if (props.paymentDate) {
      DateVO.create('Payment Date', props.paymentDate);
      this.paymentDate = props.paymentDate;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
