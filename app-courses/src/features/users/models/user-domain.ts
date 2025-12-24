import { LengthVO, EmailVO, ArrayVO } from '../../../core/value-objects';
import { Role } from '../entities';

type UserEssentials = {
  name: string;
  email: string;
  roles: Role[];
}

type UserOptionals = {
  id: number;
}

type UserProps = UserEssentials & Partial<UserOptionals>;
type UserUpdate = Partial<UserEssentials>;

export class User {
  private readonly id: number;
  private name: string;
  private email: string;
  private roles: Role[];
  private deletedAt: Date | undefined;

  constructor(props: UserProps) {
    const nameVO = LengthVO.create('Name', props.name, 3);
    const emailVO = EmailVO.create('Email', props.email);
    const rolesVO = ArrayVO.create('Roles', props.roles);

    if (props.id) {
      this.id = props.id;
    }
    this.name = nameVO.value;
    this.email = emailVO.value;
    this.roles = rolesVO.value;
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      roles: this.roles,
      deletedAt: this.deletedAt,
    };
  }

  update(props: UserUpdate) {
    if (props.name) {
      const nameVO = LengthVO.create('Name', props.name, 3);
      this.name = nameVO.value;
    }
    if (props.email) {
      const emailVO = EmailVO.create('Email', props.email);
      this.email = emailVO.value;
    }
    if (props.roles) {
      const rolesVO = ArrayVO.create('Roles', props.roles);
      this.roles = rolesVO.value;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
