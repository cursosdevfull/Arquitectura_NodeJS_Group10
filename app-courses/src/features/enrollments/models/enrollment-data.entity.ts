import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ScheduleData } from "../../schedules/models";
import { StudentData } from "../../students/models";

@Entity({ name: "enrollment" })
export class EnrollmentData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime" })
  enrollmentDate: Date;

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date | undefined;

  @ManyToOne(() => ScheduleData, schedule => schedule.enrollments)
  @JoinColumn({ name: "scheduleId" })
  schedule: ScheduleData;

  @ManyToOne(() => StudentData, student => student.enrollments)
  @JoinColumn({ name: "studentId" })
  student: StudentData;
}
