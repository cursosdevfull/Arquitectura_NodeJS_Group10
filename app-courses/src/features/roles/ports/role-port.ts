import { Role } from '../models';

export interface RolePort {
  save(role: Role): void;
  getAll(): Role[];
  getOne(roleId: number): Role | null;
  getByPage(page: number): Role[];
  update(roleId: number, role: Role): void;
  delete(roleId: number): void;
}
