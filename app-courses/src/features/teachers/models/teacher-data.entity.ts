import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ScheduleData } from "../../schedules/models";

@Entity({ name: "teacher" })
export class TeacherData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column({ type: "varchar", length: 150 })
  email: string;

  @Column({ type: "varchar", length: 20 })
  phone: string;

  @Column({ type: "varchar", length: 200 })
  linkedIn: string;

  @Column({ type: "text" })
  summary: string;

  @Column({ type: "varchar", length: 300 })
  photoUrl: string;

  @Column({ type: "json" })
  skills: string[];

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date | undefined;

  @OneToMany(() => ScheduleData, schedule => schedule.teacher)
  schedules: ScheduleData[];
}
