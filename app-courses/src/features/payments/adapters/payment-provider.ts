import { DataSource } from "typeorm";
import { PaymentData } from "../models";

export const paymentProviders = [
    {
        provide: "PAYMENT_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentData),
        inject: ["DATASOURCE"],
    }
]