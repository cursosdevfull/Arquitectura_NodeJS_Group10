import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { RoleData } from '../models';
import { RolePort } from '../ports';
import { Repository } from 'typeorm';

export class RoleAdapter extends AdapterBase<RoleData> implements RolePort {
    constructor(@Inject("ROLE_REPOSITORY") protected repository: Repository<RoleData>) {
        super(repository);
    }
}
