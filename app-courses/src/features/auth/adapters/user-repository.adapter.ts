import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import type { UserRepository } from '../ports';
import { User } from '../entities';
import { UserData } from '../../users/models';

@Injectable()
export class UserRepositoryAdapter implements UserRepository {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<UserData>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        const userData = await this.userRepository.findOne({
            where: { email },
            relations: ['roles']
        });

        if (!userData) {
            return null;
        }

        const roles = userData.roles?.map(role => role.name) || [];
        return new User(userData.id, userData.email, userData.password, userData.name, roles);
    }

    async findById(id: number): Promise<User | null> {
        const userData = await this.userRepository.findOne({
            where: { id },
            relations: ['roles']
        });

        if (!userData) {
            return null;
        }

        const roles = userData.roles?.map(role => role.name) || [];
        return new User(userData.id, userData.email, userData.password, userData.name, roles);
    }
}