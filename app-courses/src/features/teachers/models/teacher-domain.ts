import {
  ArrayVO,
  EmailVO,
  LengthVO,
  ImageVO,
} from '../../../core/value-objects';
import { PhoneVO, LinkedInVO } from '../value-objects';

export class Teacher {
  private readonly teacherId: number;
  private name: string;
  private lastname: string;
  private email: string;
  private phone: string;
  private linkedIn: string;
  private summary: string;
  private photoUrl: string;
  private skills: string[];
  private deletedAt: Date | undefined;

  constructor(
    name: string,
    lastname: string,
    email: string,
    phone: string,
    linkedIn: string,
    summary: string,
    photoUrl: string,
    skills: string[],
  ) {
    const nameVO = LengthVO.create('Name', name, 3);
    const lastnameVO = LengthVO.create('Lastname', name, 3);
    const summaryVO = LengthVO.create('Summary', name, 10);
    const emailVO = EmailVO.create('Email', email);
    const skillsVO = ArrayVO.create('Skills', skills);
    const phoneVO = PhoneVO.create('Phone', phone);
    const linkedInVO = LinkedInVO.create('LinkedIn', linkedIn);
    const photoUrlVO = ImageVO.create('Photo', photoUrl);

    this.teacherId = Math.floor(Math.random() * 1000);
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
      teacherId: this.teacherId,
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
}
