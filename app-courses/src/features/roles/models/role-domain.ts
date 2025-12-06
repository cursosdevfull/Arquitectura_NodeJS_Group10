import { LengthVO } from '../../../core/value-objects';

export class Role {
  private readonly roleId: number;
  private name: string;
  private deletedAt: Date | undefined;

  constructor(name: string) {
    const nameVO = LengthVO.create('Name', name, 3);

    this.roleId = Math.floor(Math.random() * 1000);
    this.name = nameVO.value;
  }

  properties() {
    return {
      roleId: this.roleId,
      name: this.name,
      deletedAt: this.deletedAt,
    };
  }
}
