import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { Session } from '../models';
import { SessionPort } from '../ports';
import { Repository } from 'typeorm';

export class SessionAdapter extends AdapterBase<Session> implements SessionPort {
    constructor(@Inject("SESSION_REPOSITORY") protected repository: Repository<Session>) {
        super(repository);
    }
}
