import { DataSource } from "typeorm";
import { RoleData } from "../models";

export const roleProviders = [
    {
        provide: "ROLE_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RoleData),
        inject: ["DATASOURCE"],
    }
]