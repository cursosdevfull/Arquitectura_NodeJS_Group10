import { Inject } from '@nestjs/common';
import { Role } from '../models';
import type { RolePort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';

export class RoleApplication extends ApplicationBase<Role, RolePort> {
  constructor(@Inject('RoleAdapter') adapter: RolePort) {
    super(adapter);
  }
}
