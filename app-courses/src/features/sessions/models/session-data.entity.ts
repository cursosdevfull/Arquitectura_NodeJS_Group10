import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ScheduleData } from "../../schedules/models";
import { VideoData } from "../../videos/models";

@Entity({ name: "session" })
export class SessionData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime" })
  sessionDate: Date;

  @Column({ type: "varchar", length: 50 })
  hours: string;

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date | undefined;

  @ManyToOne(() => ScheduleData, schedule => schedule.sessions)
  @JoinColumn({ name: "scheduleId" })
  schedule: ScheduleData;

  @OneToMany(() => VideoData, video => video.session)
  videos: VideoData[];
}
