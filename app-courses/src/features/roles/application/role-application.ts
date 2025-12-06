import { RoleAdapter } from '../adapters';
import { Role } from '../models';
import { RolePort } from '../ports';

export class RoleApplication {
  private readonly adapter: RolePort;

  constructor() {
    this.adapter = new RoleAdapter();
  }

  save(role: Role) {
    this.adapter.save(role);
  }

  getAll() {
    return this.adapter.getAll();
  }

  getOne(roleId: number) {
    return this.adapter.getOne(roleId);
  }

  getByPage(page: number) {
    return this.adapter.getByPage(page);
  }

  update(roleId: number, role: Role) {
    this.adapter.update(roleId, role);
  }

  delete(roleId: number) {
    this.adapter.delete(roleId);
  }
}
