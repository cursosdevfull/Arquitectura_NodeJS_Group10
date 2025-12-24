import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { Role } from '../models';
import { RolePort } from '../ports';
import { Repository } from 'typeorm';

export class RoleAdapter extends AdapterBase<Role> implements RolePort {
    constructor(@Inject("ROLE_REPOSITORY") protected repository: Repository<Role>) {
        super(repository);
    }
}
