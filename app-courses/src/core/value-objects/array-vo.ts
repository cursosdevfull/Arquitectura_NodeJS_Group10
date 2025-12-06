import { BaseVO } from './base-vo';

export class ArrayVO<T> extends BaseVO<T[]> {
  private constructor(value: T[]) {
    super(value);
  }

  static create<T>(fieldName: string, value: T[], min: number = 1) {
    if (value.length < min)
      throw new Error(`${fieldName} must have at least ${min} element`);

    return new ArrayVO<T>(value);
  }
}
