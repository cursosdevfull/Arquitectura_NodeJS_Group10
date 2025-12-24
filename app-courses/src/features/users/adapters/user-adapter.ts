import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { User } from '../models';
import { UserPort } from '../ports';
import { Repository } from 'typeorm';

export class UserAdapter extends AdapterBase<User> implements UserPort {
    constructor(@Inject("USER_REPOSITORY") protected repository: Repository<User>) {
        super(repository);
    }
}
