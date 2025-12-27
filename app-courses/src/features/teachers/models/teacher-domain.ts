import {
  ArrayVO,
  EmailVO,
  LengthVO,
  ImageVO,
} from '../../../core/value-objects';
import { PhoneVO, LinkedInVO } from '../value-objects';

type TeacherEssentials = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  linkedIn: string;
  summary: string;
  photoUrl: string;
  skills: string[];
}

type TeacherOptionals = {
  id: number;
}

type TeacherProps = TeacherEssentials & Partial<TeacherOptionals>;
type TeacherUpdate = Partial<TeacherEssentials>;

export class Teacher {
  private readonly id: number;
  private name: string;
  private lastname: string;
  private email: string;
  private phone: string;
  private linkedIn: string;
  private summary: string;
  private photoUrl: string;
  private skills: string[];
  private deletedAt: Date | undefined;

  constructor(props: TeacherProps) {
    const nameVO = LengthVO.create('Name', props.name, 3);
    const lastnameVO = LengthVO.create('Lastname', props.lastname, 3);
    const summaryVO = LengthVO.create('Summary', props.summary, 10);
    const emailVO = EmailVO.create('Email', props.email);
    const skillsVO = ArrayVO.create('Skills', props.skills);
    const phoneVO = PhoneVO.create('Phone', props.phone);
    const linkedInVO = LinkedInVO.create('LinkedIn', props.linkedIn);
    //const photoUrlVO = ImageVO.create('Photo', props.photoUrl);
    const photoUrlVO = LengthVO.create('Photo', props.photoUrl, 10);

    if (props.id) {
      this.id = props.id;
    }
    this.name = nameVO.value;
    this.lastname = lastnameVO.value;
    this.email = emailVO.value;
    this.phone = phoneVO.value;
    this.linkedIn = linkedInVO.value;
    this.summary = summaryVO.value;
    this.photoUrl = photoUrlVO.value;
    this.skills = skillsVO.value;
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      phone: this.phone,
      linkedIn: this.linkedIn,
      summary: this.summary,
      photoUrl: this.photoUrl,
      skills: this.skills,
      deletedAt: this.deletedAt,
    };
  }

  update(props: TeacherUpdate) {
    if (props.name) {
      const nameVO = LengthVO.create('Name', props.name, 3);
      this.name = nameVO.value;
    }
    if (props.lastname) {
      const lastnameVO = LengthVO.create('Lastname', props.lastname, 3);
      this.lastname = lastnameVO.value;
    }
    if (props.email) {
      const emailVO = EmailVO.create('Email', props.email);
      this.email = emailVO.value;
    }
    if (props.phone) {
      const phoneVO = PhoneVO.create('Phone', props.phone);
      this.phone = phoneVO.value;
    }
    if (props.linkedIn) {
      const linkedInVO = LinkedInVO.create('LinkedIn', props.linkedIn);
      this.linkedIn = linkedInVO.value;
    }
    if (props.summary) {
      const summaryVO = LengthVO.create('Summary', props.summary, 10);
      this.summary = summaryVO.value;
    }
    if (props.photoUrl) {
      const photoUrlVO = LengthVO.create('Photo', props.photoUrl, 10);
      this.photoUrl = photoUrlVO.value;
    }
    if (props.skills) {
      const skillsVO = ArrayVO.create('Skills', props.skills);
      this.skills = skillsVO.value;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
