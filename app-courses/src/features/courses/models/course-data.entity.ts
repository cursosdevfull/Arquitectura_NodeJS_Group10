import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ScheduleData } from "../../schedules/models";

@Entity({ name: "course" })
export class CourseData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date | undefined;

  @OneToMany(() => ScheduleData, schedule => schedule.course)
  schedules: ScheduleData[];
}
