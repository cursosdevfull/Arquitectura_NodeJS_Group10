import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseIntercetor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    const status = response.statusCode;

    return next.handle().pipe(
      map((data: unknown) => {
        return { status, data };
      }),
    );
  }
}
