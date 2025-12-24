import { DataSource } from "typeorm";
import { StudentData } from "../models";

export const studentProviders = [
    {
        provide: "STUDENT_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(StudentData),
        inject: ["DATASOURCE"],
    }
]