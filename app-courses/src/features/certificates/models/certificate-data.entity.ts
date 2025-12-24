import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ScheduleData } from "../../schedules/models";
import { StudentData } from "../../students/models";

@Entity({ name: "certificate" })
export class CertificateData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime" })
  dateEmission: Date;

  @Column({ type: "varchar", length: 255, unique: true })
  key: string;

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date | undefined;

  @ManyToOne(() => ScheduleData, schedule => schedule.certificates)
  @JoinColumn({ name: "scheduleId" })
  schedule: ScheduleData;

  @ManyToOne(() => StudentData, student => student.certificates)
  @JoinColumn({ name: "studentId" })
  student: StudentData;
}
