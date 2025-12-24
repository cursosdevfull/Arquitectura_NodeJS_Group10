import { CustomErrorValueObject } from '../errors';
import { BaseVO } from './base-vo';

export class DateVO extends BaseVO<Date> {
  private constructor(value: Date) {
    super(value);
  }

  static create(fieldName: string, value: Date) {
    const now = Date.now();
    const date = value.getTime();

    if (date < now)
      throw new CustomErrorValueObject(
        `${fieldName} must be greater that the current date`,
      );

    return new DateVO(value);
  }
}
