import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { CustomError } from './custom-error';
import { Response } from 'express';

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log('CustomExceptionFilter caught an error:', exception);

    if (exception instanceof CustomError) {
      const errorResponse = {
        statusCode: exception.statusCode,
        message: exception.message,
        stack: exception.stack,
        timestamp: new Date().toISOString(),
        error: exception.name,
      };

      return response.status(exception.statusCode).json(errorResponse);
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      statusCode: status,
      message: exception.message || 'Internal Server Error',
      timestamp: new Date().toISOString(),
      stack: exception.stack,
      error: exception.name,
    };

    response.status(status).json(errorResponse);
  }
}
