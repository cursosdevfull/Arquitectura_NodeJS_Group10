import { DataSource } from "typeorm";
import { EnrollmentData } from "../models";

export const enrollmentProviders = [
    {
        provide: "ENROLLMENT_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EnrollmentData),
        inject: ["DATASOURCE"],
    }
]