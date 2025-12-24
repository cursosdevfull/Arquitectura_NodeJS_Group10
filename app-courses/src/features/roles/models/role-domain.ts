import { LengthVO } from '../../../core/value-objects';

type RoleEssentials = {
  name: string;
}

type RoleOptionals = {
  id: number;
}

type RoleProps = RoleEssentials & Partial<RoleOptionals>;
type RoleUpdate = Partial<RoleEssentials>;

export class Role {
  private readonly id: number;
  private name: string;
  private deletedAt: Date | undefined;

  constructor(props: RoleProps) {
    const nameVO = LengthVO.create('Name', props.name, 3);

    if (props.id) {
      this.id = props.id;
    }
    this.name = nameVO.value;
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      deletedAt: this.deletedAt,
    };
  }

  update(props: RoleUpdate) {
    if (props.name) {
      const nameVO = LengthVO.create('Name', props.name, 3);
      this.name = nameVO.value;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
