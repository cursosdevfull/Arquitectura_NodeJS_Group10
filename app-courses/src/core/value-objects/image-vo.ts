import { BaseVO } from './base-vo';

export class ImageVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(fieldName: string, value: string) {
    if (!value.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i))
      throw new Error(`${fieldName} must be a valid photo URL`);

    return new ImageVO(value);
  }
}
