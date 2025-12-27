import { Inject } from '@nestjs/common';
import { Role, RoleData } from '../models';
import type { RolePort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';
import { RoleDto } from './dtos';

export class RoleApplication extends ApplicationBase<Role, RoleData, RolePort> {
  constructor(@Inject('RoleAdapter') adapter: RolePort) {
    super(adapter, RoleDto.fromDomainToData, RoleDto.fromDataToDomain);
  }
}
