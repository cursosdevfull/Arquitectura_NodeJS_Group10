import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToMany, JoinTable } from "typeorm";
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

  @ManyToMany(() => RoleData, role => role.users)
  @JoinTable({ name: "rolesByUser" })
  roles: RoleData[];
}
