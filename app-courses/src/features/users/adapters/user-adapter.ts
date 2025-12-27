import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { UserData } from '../models';
import { UserPort } from '../ports';
import { Repository } from 'typeorm';

export class UserAdapter extends AdapterBase<UserData> implements UserPort {
    constructor(@Inject("USER_REPOSITORY") protected repository: Repository<UserData>) {
        super(repository);
    }
}
