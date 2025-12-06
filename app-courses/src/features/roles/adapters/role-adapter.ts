import { Role } from '../models';
import { RolePort } from '../ports';

export class RoleAdapter implements RolePort {
  private roles: Role[] = [];

  save(role: Role): void {
    this.roles.push(role);
  }

  getAll(): Role[] {
    return this.roles;
  }

  getOne(roleId: number): Role | null {
    const role = this.roles.find((r) => r.properties().roleId === roleId);
    return role || null;
  }

  getByPage(page: number): Role[] {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.roles.slice(startIndex, endIndex);
  }

  update(roleId: number, role: Role): void {
    const index = this.roles.findIndex((r) => r.properties().roleId === roleId);
    if (index !== -1) {
      this.roles[index] = role;
    }
  }

  delete(roleId: number): void {
    const index = this.roles.findIndex((r) => r.properties().roleId === roleId);
    if (index !== -1) {
      this.roles.splice(index, 1);
    }
  }
}
