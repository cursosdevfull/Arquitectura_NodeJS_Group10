import { LengthVO, EmailVO, ArrayVO } from '../../../core/value-objects';
import { Role } from '../entities';

export class User {
  private readonly userId: number;
  private name: string;
  private email: string;
  private roles: Role[];
  private deletedAt: Date | undefined;

  constructor(name: string, email: string, roles: Role[]) {
    const nameVO = LengthVO.create('Name', name, 3);
    const emailVO = EmailVO.create('Email', email);
    const rolesVO = ArrayVO.create('Roles', roles);

    this.userId = Math.floor(Math.random() * 1000);
    this.name = nameVO.value;
    this.email = emailVO.value;
    this.roles = rolesVO.value;
  }

  properties() {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email,
      roles: this.roles,
      deletedAt: this.deletedAt,
    };
  }
}
