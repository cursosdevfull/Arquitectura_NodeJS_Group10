import { Module } from '@nestjs/common';
import { PaymentController } from './payment-controller';
import { PaymentApplication } from '../application';
import { PaymentAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { paymentProviders } from '../adapters/payment-provider';

@Module({
    controllers: [PaymentController],
    providers: [
        {
            provide: 'PaymentApplication',
            useClass: PaymentApplication,
        },
        {
            provide: 'PaymentAdapter',
            useClass: PaymentAdapter,
        },
        ...paymentProviders
    ],
    imports: [DatabaseModule],
})
export class PaymentModule { }