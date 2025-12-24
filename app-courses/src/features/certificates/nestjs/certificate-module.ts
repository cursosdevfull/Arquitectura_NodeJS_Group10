import { Module } from '@nestjs/common';
import { CertificateController } from './certificate-controller';
import { CertificateApplication } from '../application';
import { CertificateAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { certificateProviders } from '../adapters/certificate-provider';

@Module({
    controllers: [CertificateController],
    providers: [
        {
            provide: 'CertificateApplication',
            useClass: CertificateApplication,
        },
        {
            provide: 'CertificateAdapter',
            useClass: CertificateAdapter,
        },
        ...certificateProviders
    ],
    imports: [DatabaseModule],
})
export class CertificateModule { }