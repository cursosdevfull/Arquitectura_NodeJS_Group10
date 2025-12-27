import { BaseVO } from '../../../core/value-objects';

export class PhoneVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(fieldName: string, value: string) {
    if (!value.match(/^\d{7,}$/))
      throw new Error(`${fieldName} must be a valid phone`);

    return new PhoneVO(value);
  }
}
