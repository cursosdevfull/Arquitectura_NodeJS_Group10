import { DataSource } from "typeorm";
import { UserData } from "../models";

export const userProviders = [
    {
        provide: "USER_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserData),
        inject: ["DATASOURCE"],
    }
]