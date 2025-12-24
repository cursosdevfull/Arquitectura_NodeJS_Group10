import { HttpStatus } from '@nestjs/common';
import { CustomError } from './custom-error';

export class CustomErrorApplication extends CustomError {
  constructor(message: string, name: string) {
    super(message, HttpStatus.LENGTH_REQUIRED);
    this.name = name;
  }
}
