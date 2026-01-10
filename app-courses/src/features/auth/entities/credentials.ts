import { EmailVO } from '../../../core/value-objects';

export class Credentials {
    constructor(
        public readonly email: EmailVO,
        public readonly password: string,
    ) { }

    static create(email: string, password: string): Credentials {
        if (!password || password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }

        const emailVO = EmailVO.create('email', email);
        return new Credentials(emailVO, password);
    }
}