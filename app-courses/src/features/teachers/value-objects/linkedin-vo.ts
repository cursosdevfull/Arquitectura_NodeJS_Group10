import { BaseVO } from '../../../core/value-objects';

export class LinkedInVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(fieldName: string, value: string) {
    if (
      !value.match(
        /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
      )
    )
      throw new Error(`${fieldName} must be a valid LinkedIn URL`);

    return new LinkedInVO(value);
  }
}
