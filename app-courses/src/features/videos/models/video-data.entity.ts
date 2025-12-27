import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { SessionData } from "../../sessions/models";

@Entity({ name: "video" })
export class VideoData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  videoUrl: string;

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date | undefined;

  @ManyToOne(() => SessionData, session => session.videos)
  @JoinColumn({ name: "sessionId" })
  session: SessionData;
}
