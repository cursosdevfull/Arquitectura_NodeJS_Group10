import { Inject } from '@nestjs/common';
import { User, UserData } from '../models';
import type { UserPort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';
import { UserDto } from './dtos';

export class UserApplication extends ApplicationBase<User, UserData, UserPort> {
  constructor(@Inject('UserAdapter') adapter: UserPort) {
    super(adapter, UserDto.fromDomainToData, UserDto.fromDataToDomain);
  }
}
