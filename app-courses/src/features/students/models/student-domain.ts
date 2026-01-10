import { AggregateRoot } from '@nestjs/cqrs';
import { LengthVO, EmailVO } from '../../../core/value-objects';
import { StudentCreatedEvent } from './events/student-created.event';
import { StudentUpdatedEvent } from './events/student-updated.event';

type StudentEssentials = {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  country: string;
}

type StudentsOptionals = {
  id: number;
}

type StudentProps = StudentEssentials & Partial<StudentsOptionals>;
type StudentUpdate = Partial<StudentEssentials>;

export class Student extends AggregateRoot {
  private readonly id: number;
  private name: string;
  private lastname: string;
  private nickname: string;
  private email: string;
  private country: string;
  private deletedAt: Date | undefined;

  constructor(props: StudentProps) {
    super();
    const nameVO = LengthVO.create('Name', props.name, 3);
    const lastnameVO = LengthVO.create('Lastname', props.lastname, 3);
    const nicknameVO = LengthVO.create('Nickname', props.nickname, 3);
    const emailVO = EmailVO.create('Email', props.email);
    const countryVO = LengthVO.create('Country', props.country, 2);

    if (props.id) {
      this.id = props.id;
    }
    this.name = nameVO.value;
    this.lastname = lastnameVO.value;
    this.nickname = nicknameVO.value;
    this.email = emailVO.value;
    this.country = countryVO.value;

    if (!props.id) {
      const eventCreated = new StudentCreatedEvent();
      Object.assign(eventCreated, this.properties());
      this.apply(eventCreated);
    }
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      nickname: this.nickname,
      email: this.email,
      country: this.country,
      deletedAt: this.deletedAt,
    };
  }

  update(props: StudentUpdate) {
    if (props.name) {
      const nameVO = LengthVO.create('Name', props.name, 3);
      this.name = nameVO.value;
    }
    if (props.lastname) {
      const lastnameVO = LengthVO.create('Lastname', props.lastname, 3);
      this.lastname = lastnameVO.value;
    }
    if (props.nickname) {
      const nicknameVO = LengthVO.create('Nickname', props.nickname, 3);
      this.nickname = nicknameVO.value;
    }
    if (props.email) {
      const emailVO = EmailVO.create('Email', props.email);
      this.email = emailVO.value;
    }
    if (props.country) {
      const countryVO = LengthVO.create('Country', props.country, 2);
      this.country = countryVO.value;
    }

    const eventUpdated = new StudentUpdatedEvent();
    Object.assign(eventUpdated, this.properties());
    this.apply(eventUpdated);
  }

  delete() {
    this.deletedAt = new Date();
  }
}
