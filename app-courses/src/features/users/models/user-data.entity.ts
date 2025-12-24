import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { RoleData } from "../../roles/models";

@Entity({ name: "user" })
export class UserData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email: string;

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date | undefined;

  @ManyToOne(() => RoleData, role => role.users)
  @JoinColumn({ name: "roleId" })
  role: RoleData;
}
