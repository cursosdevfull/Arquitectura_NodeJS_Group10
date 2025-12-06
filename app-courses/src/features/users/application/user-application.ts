import { UserAdapter } from '../adapters';
import { User } from '../models';
import { UserPort } from '../ports';

export class UserApplication {
  private readonly adapter: UserPort;

  constructor() {
    this.adapter = new UserAdapter();
  }

  save(user: User) {
    this.adapter.save(user);
  }

  getAll() {
    return this.adapter.getAll();
  }

  getOne(userId: number) {
    return this.adapter.getOne(userId);
  }

  getByPage(page: number) {
    return this.adapter.getByPage(page);
  }

  update(userId: number, user: User) {
    this.adapter.update(userId, user);
  }

  delete(userId: number) {
    this.adapter.delete(userId);
  }
}
