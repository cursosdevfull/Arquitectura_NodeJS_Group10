import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { UserData } from "../../users/models";

@Entity({ name: "role" })
export class RoleData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date | undefined;

  @ManyToMany(() => UserData, user => user.roles)
  users: UserData[];
}
