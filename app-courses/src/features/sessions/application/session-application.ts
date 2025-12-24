import { Inject } from '@nestjs/common';
import { Session } from '../models';
import type { SessionPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';

export class SessionApplication extends ApplicationBase<Session, SessionPort> {
  constructor(@Inject('SessionAdapter') adapter: SessionPort) {
    super(adapter);
  }
}
