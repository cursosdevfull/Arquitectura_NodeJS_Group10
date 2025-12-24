import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CourseData } from "../../courses/models";
import { TeacherData } from "../../teachers/models";
import { EnrollmentData } from "../../enrollments/models";
import { PaymentData } from "../../payments/models";
import { SessionData } from "../../sessions/models";
import { CertificateData } from "../../certificates/models";

@Entity({ name: "schedule" })
export class ScheduleData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 300 })
  imageUrl: string;

  @Column({ type: "int" })
  duration: number;

  @Column({ type: "text" })
  resume: string;

  @Column({ type: "json" })
  goals: string[];

  @Column({ type: "json" })
  syllabus: string[];

  @Column({ type: "json" })
  requirements: string[];

  @Column({ type: "varchar", length: 50 })
  frequency: string;

  @Column({ type: "datetime" })
  start: Date;

  @Column({ type: "varchar", length: 50 })
  rangeHours: string;

  @Column({ type: "varchar", length: 200 })
  slogan: string;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date | undefined;

  @ManyToOne(() => CourseData, course => course.schedules)
  @JoinColumn({ name: "courseId" })
  course: CourseData;

  @ManyToOne(() => TeacherData, teacher => teacher.schedules)
  @JoinColumn({ name: "teacherId" })
  teacher: TeacherData;

  @OneToMany(() => EnrollmentData, enrollment => enrollment.schedule)
  enrollments: EnrollmentData[];

  @OneToMany(() => PaymentData, payment => payment.schedule)
  payments: PaymentData[];

  @OneToMany(() => SessionData, session => session.schedule)
  sessions: SessionData[];

  @OneToMany(() => CertificateData, certificate => certificate.schedule)
  certificates: CertificateData[];
}
