import { DataSource } from "typeorm";
import { CertificateData } from "../models";

export const certificateProviders = [
    {
        provide: "CERTIFICATE_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CertificateData),
        inject: ["DATASOURCE"],
    }
]