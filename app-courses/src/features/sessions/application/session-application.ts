import { Inject } from '@nestjs/common';
import { Session, SessionData } from '../models';
import type { SessionPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';
import { SessionDto } from './dtos';

export class SessionApplication extends ApplicationBase<Session, SessionData, SessionPort> {
  constructor(@Inject('SessionAdapter') adapter: SessionPort) {
    super(adapter, SessionDto.fromDomainToData, SessionDto.fromDataToDomain);
  }
}
