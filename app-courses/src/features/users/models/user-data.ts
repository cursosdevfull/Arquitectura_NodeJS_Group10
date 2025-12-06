import { Role } from '../entities/role';

export class UserData {
  name: string;
  email: string;
  roles: Role[];
  deletedAt: Date | undefined;
}
