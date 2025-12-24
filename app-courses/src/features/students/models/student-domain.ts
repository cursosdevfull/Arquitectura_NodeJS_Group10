import { LengthVO } from '../../../core/value-objects';

type StudentEssentials = {
  name: string;
  lastname: string;
  nickname: string;
  country: string;
}

type StudentsOptionals = {
  id: number;
}

type StudentProps = StudentEssentials & Partial<StudentsOptionals>;
type StudentUpdate = Partial<StudentEssentials>;

export class Student {
  private readonly id: number;
  private name: string;
  private lastname: string;
  private nickname: string;
  private country: string;
  private deletedAt: Date | undefined;

  constructor(props: StudentProps) {
    const nameVO = LengthVO.create('Name', props.name, 3);
    const lastnameVO = LengthVO.create('Lastname', props.lastname, 3);
    const nicknameVO = LengthVO.create('Nickname', props.nickname, 3);
    const countryVO = LengthVO.create('Country', props.country, 2);

    if (props.id) {
      this.id = props.id;
    }
    this.name = nameVO.value;
    this.lastname = lastnameVO.value;
    this.nickname = nicknameVO.value;
    this.country = countryVO.value;
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      nickname: this.nickname,
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
    if (props.country) {
      const countryVO = LengthVO.create('Country', props.country, 2);
      this.country = countryVO.value;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
