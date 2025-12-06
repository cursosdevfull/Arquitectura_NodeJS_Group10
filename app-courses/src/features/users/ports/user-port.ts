import { User } from '../models';

export interface UserPort {
  save(user: User): void;
  getAll(): User[];
  getOne(userId: number): User | null;
  getByPage(page: number): User[];
  update(userId: number, user: User): void;
  delete(userId: number): void;
}
