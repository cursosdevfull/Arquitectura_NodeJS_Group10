import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ScheduleData } from "../../schedules/models";
import { StudentData } from "../../students/models";

@Entity({ name: "payment" })
export class PaymentData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "varchar", length: 10 })
  currency: string;

  @Column({ type: "text", nullable: true })
  note: string;

  @Column({ type: "datetime" })
  paymentDate: Date;

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date | undefined;

  @ManyToOne(() => ScheduleData, schedule => schedule.payments)
  @JoinColumn({ name: "scheduleId" })
  schedule: ScheduleData;

  @ManyToOne(() => StudentData, student => student.payments)
  @JoinColumn({ name: "studentId" })
  student: StudentData;
}
