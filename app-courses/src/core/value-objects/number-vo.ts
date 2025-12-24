import { CustomErrorValueObject } from '../errors';
import { BaseVO } from './base-vo';

export class NumberVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(fieldName: string, value: number, min: number = 1) {
    if (value < min)
      throw new CustomErrorValueObject(`${fieldName} must be at least ${min}`);

    return new NumberVO(value);
  }
}
