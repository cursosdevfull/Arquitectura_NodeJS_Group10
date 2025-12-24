import { Inject } from '@nestjs/common';
import { User } from '../models';
import type { UserPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';

export class UserApplication extends ApplicationBase<User, UserPort> {
  constructor(@Inject('UserAdapter') adapter: UserPort) {
    super(adapter);
  }
}
