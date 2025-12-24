import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { EnrollmentData } from "../../enrollments/models";
import { PaymentData } from "../../payments/models";
import { CertificateData } from "../../certificates/models";

@Entity({ name: "student" })
export class StudentData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column({ type: "varchar", length: 50 })
  nickname: string;

  @Column({ type: "varchar", length: 100 })
  country: string;

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date | undefined;

  @OneToMany(() => EnrollmentData, enrollment => enrollment.student)
  enrollments: EnrollmentData[];

  @OneToMany(() => PaymentData, payment => payment.student)
  payments: PaymentData[];

  @OneToMany(() => CertificateData, certificate => certificate.student)
  certificates: CertificateData[];
}
