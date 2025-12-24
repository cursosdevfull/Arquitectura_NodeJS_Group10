import { DataSource } from "typeorm";
import { ScheduleData } from "../models";

export const scheduleProviders = [
    {
        provide: "SCHEDULE_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ScheduleData),
        inject: ["DATASOURCE"],
    }
]