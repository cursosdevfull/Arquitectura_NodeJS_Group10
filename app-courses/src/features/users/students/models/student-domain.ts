export class StudentDomain {
  private readonly studentId: number;
  private name: string;
  private lastname: string;
  private nickname: string;
  private country: string;
  private deletedAt: Date | undefined;

  constructor(
    name: string,
    lastname: string,
    nickname: string,
    country: string,
  ) {
    this.name = name;
    this.lastname = lastname;
    this.nickname = nickname;
    this.country = country;
  }

  properties() {
    return {
      studentId: this.studentId,
      name: this.name,
      lastname: this.lastname,
      nickname: this.nickname,
      country: this.country,
      deletedAt: this.deletedAt,
    };
  }
}
