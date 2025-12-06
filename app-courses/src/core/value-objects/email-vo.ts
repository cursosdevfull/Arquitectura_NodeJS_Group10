import { BaseVO } from './base-vo';

export class EmailVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(fieldName: string, value: string) {
    if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i))
      throw new Error(`${fieldName} must be a valid email address`);

    return new EmailVO(value);
  }
}
