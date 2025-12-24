import { DataSource } from "typeorm";
import { SessionData } from "../models";

export const sessionProviders = [
    {
        provide: "SESSION_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SessionData),
        inject: ["DATASOURCE"],
    }
]