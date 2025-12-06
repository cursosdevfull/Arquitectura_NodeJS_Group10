import { User } from '../models';
import { UserPort } from '../ports';

export class UserAdapter implements UserPort {
  private users: User[] = [];

  save(user: User): void {
    this.users.push(user);
  }

  getAll(): User[] {
    return this.users;
  }

  getOne(userId: number): User | null {
    const user = this.users.find((u) => u.properties().userId === userId);
    return user || null;
  }

  getByPage(page: number): User[] {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.users.slice(startIndex, endIndex);
  }

  update(userId: number, user: User): void {
    const index = this.users.findIndex((u) => u.properties().userId === userId);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  delete(userId: number): void {
    const index = this.users.findIndex((u) => u.properties().userId === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
