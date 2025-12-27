import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { SessionData } from '../models';
import { SessionPort } from '../ports';
import { Repository } from 'typeorm';

export class SessionAdapter extends AdapterBase<SessionData> implements SessionPort {
    constructor(@Inject("SESSION_REPOSITORY") protected repository: Repository<SessionData>) {
        super(repository);
    }
}
