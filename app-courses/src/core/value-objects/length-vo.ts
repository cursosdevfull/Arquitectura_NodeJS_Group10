import { BaseVO } from './base-vo';

export class LengthVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(fieldName: string, value: string, min: number) {
    if (value.length < min)
      throw new Error(`${fieldName} must be at least ${min} characters long`);

    return new LengthVO(value);
  }
}
