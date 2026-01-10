import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { HashService } from '../ports';

@Injectable()
export class HashServiceAdapter implements HashService {
    private readonly saltRounds = 10;

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async verify(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}