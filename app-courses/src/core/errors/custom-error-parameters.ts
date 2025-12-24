import { HttpStatus } from '@nestjs/common';
import { CustomError } from './custom-error';
import { NameErrors } from './name-errors';

export class CustomErrorParameters extends CustomError {
  constructor(message: string) {
    super(message, HttpStatus.LENGTH_REQUIRED);
    this.name = NameErrors.ERROR_PARAMETERS;
  }
}
